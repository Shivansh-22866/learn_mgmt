import { Request, Response } from "express";
import { clerkClient } from "../index";

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  const userData = req.body;

  // Validate input
  if (!userData.publicMetadata || !userData.publicMetadata.userType || !userData.publicMetadata.settings) {
    res.status(400).json({ message: "Invalid request data" });
    return;
  }

  try {
    const user = await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        userType: userData.publicMetadata.userType,
        settings: userData.publicMetadata.settings,
      },
    });

    res.json({ message: "User updated successfully", data: user });
  } catch (error: any) {
    console.error("Error updating user:", error); // Log detailed error for debugging
    res.status(500).json({ message: "Error updating user", error: error.message || "Internal Server Error" });
  }
};
