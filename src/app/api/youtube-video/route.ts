import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, limit, query, } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig"


export async function GET(req: NextRequest) {
    try {
      const q = query(collection(db, "youtubeVideo"), limit(1));
      const querySnapshot = await getDocs(q);
      const videos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return NextResponse.json({ data: videos }, { status: 200 });
    } catch (error) {
      console.error("Error fetching video:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }