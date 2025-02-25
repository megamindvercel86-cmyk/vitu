import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";


export async function GET(req: NextRequest) {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      return NextResponse.json({ data: users }, { status: 200 });
    } catch (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  