import { schedule } from 'node-cron';
import { connectionDB } from '@/helper/db';
import { User } from '@/models/user';
import { Task } from '@/models/task';

let cronJob; // Variable to store cron job reference

// Function to start the cron job
export function startCronJob() {
    if (cronJob) {
        console.log("Cron job is already running.");
        return;
    }

    cronJob = schedule('* * * * *', async () => { // Runs every minute
        console.log('Running cron job to delete expired users...');
        
        await connectionDB();
        const now = new Date();

        // Find users who requested deletion & their time has passed
        const usersToDelete = await User.find({
            markedForDeletion: true,
            markedForDeletionAt: { $lte: now }
        });

        for (const user of usersToDelete) {
            await Task.deleteMany({ userId: user._id }); // Delete all user tasks
            await user.deleteOne(); // Delete user
            console.log(`User ${user._id} deleted.`);
        }

        // Check if there are still users pending deletion
        const remainingUsers = await User.countDocuments({ markedForDeletion: true });

        // If no users are left, stop the cron job
        if (remainingUsers === 0) {
            console.log("No more users to delete. Stopping the cron job.");
            stopCronJob();
        }
    });

    console.log("Cron job started...");
}

// Function to stop the cron job
export function stopCronJob() {
    if (cronJob) {
        cronJob.stop();
        cronJob = null;
        console.log("Cron job stopped.");
    }
}
