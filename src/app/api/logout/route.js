import { NextResponse } from "next/server";



export async function POST(request){
    const response = NextResponse.json({
        message: 'Logout successfully!',
        success: true
    },{
        status: 200
    });

    response.cookies.set('authToken', '',{
        httpOnly: true,
        expiresIn: new Date(0)
    });
    return response
}