
import axios from "axios";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers'

const COOKIE_OPTIONS = {
  secure: true,
  path: '/',
  httpOnly: true,
  maxAge: 36000
}

export async function GET(request) {
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}



export async function POST(request) {
    const formData = await request.json();
    const {data} = await axios.post(`http://localhost:${process.env.NEXT_PUBLIC_API_URL}/login/`, formData)
    cookies().set('token', data.token, COOKIE_OPTIONS)
    return NextResponse.json(data);
}