// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import yup from "@/lib/yupFr";

const userCreateSchema = yup.object({
  email: yup.string().required().email().label("Email"),
  name: yup.string().required().label("Nom d'utilisateur"),
  password: yup.string().required().min(6).label("Mot de passe"),
});

// POST - Créer un utilisateur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Validation avec Yup
    try {
      await userCreateSchema.validate(body, { abortEarly: false });
    } catch (validationError: any) {
      return NextResponse.json(
        { message: validationError.errors },
        { status: 400 },
      );
    }
    const { name, email, password } = body;

    const superAdminToCreate = {
      name: name,
      email: email,
      password: password,
      roles: ["super admin"],
      active: true,
    };

    // Étape 1: Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: superAdminToCreate.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Super admin est déjà créé" },
        { status: 200 },
      );
    }

    // Étape 2: Vérifier si le rôle "super admin" existe déjà, sinon le créer
    let superAdminRole = await prisma.role.findUnique({
      where: { name: "super admin" },
    });

    if (!superAdminRole) {
      superAdminRole = await prisma.role.create({
        data: {
          name: "super admin",
          description: "Super Admin du site, a le pouvoir global sur le site",
        },
      });
    }

    // Étape 3: Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(superAdminToCreate.password, 10);

    // Étape 4: Créer l'utilisateur avec la relation de rôle
    const newUser = await prisma.user.create({
      data: {
        email: superAdminToCreate.email.trim(),
        name: superAdminToCreate.name.trim(),
        password: hashedPassword,
        active: superAdminToCreate.active,
        roles: {
          connect: [{ id: superAdminRole.id }], // Correction ici: utiliser un tableau d'objets avec id
        },
      },
      include: {
        roles: true,
      },
    });

    const createdSuperAdmin = {
      name: newUser.name,
      email: newUser.email,
      roles: newUser.roles,
    };

    return NextResponse.json(
      { message: "Super admin créé avec succès", user: createdSuperAdmin },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erreur dans GET /api/users:", error);

    // Gestion spécifique des erreurs Prisma

    return NextResponse.json(
      {
        error: "Erreur lors de la création du super admin",
        details: error instanceof Error ? error.message : "Erreur inconnue",
      },
      { status: 500 },
    );
  }
}
