import { connectionDB } from '@/helper/db';
import { User } from '@/models/user';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';


export async function GET(request){
    
    try{
        const authToken = await request.cookies.get('authToken')?.value;
        if(!authToken){
            return NextResponse.json({ error: 'User not logged in' }, { status: 401 });
        }


        const tokenData = jwt.verify(authToken, process.env.JWT_SECRET);
        // console.log('tokenData', tokenData);
        await connectionDB();

        const currentUser = await User.findById(tokenData._id).select('-password');
        if (!currentUser) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(currentUser);
    }catch(error){
        // console.error('Error:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}