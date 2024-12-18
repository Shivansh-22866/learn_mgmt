import Stripe from 'stripe'
import dotenv from 'dotenv'
import { Request, Response } from 'express'
import Course from '../models/courseModel'
import Transaction from '../models/transactionModel'
import UserCourseProgress from '../models/userCourseProgressModel'

dotenv.config()

if(!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createStripePaymentIntent = async(req: Request, res: Response): Promise<void> => {
    let {amount} = req.body

    if(!amount || amount <= 0) {
        amount = 50
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "inr",
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            }
        })

        res.json({
            message: "",
            data: {
                clientSecret: paymentIntent.client_secret,

            }
        })
    }

    catch(err) {
        res.status(500).json({message: "Error creating payment intent", err})
    }
}

export const listTransactions = async(req: Request, res: Response): Promise<void> => {
  let {userId} = req.query

  console.log("UserID: ", userId)

  try {
    const transaction = userId ? await Transaction.query("userId").eq(userId).exec() : await Transaction.scan().exec();

    res.json({message: "Transactions retrieved successfully", data: transaction})
  }

  catch(err) {
      res.status(500).json({message: "Error receiving transactions", err})
  }
}

export const createTransaction = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { userId, courseId, transactionId, amount, paymentProvider } = req.body;
  
    try {
      // 1. get course info
      const course = await Course.get(courseId);
  
      // 2. create transaction record
      const newTransaction = new Transaction({
        dateTime: new Date().toISOString(),
        userId,
        courseId,
        transactionId,
        amount,
        paymentProvider,
      });
      await newTransaction.save();
  
      // 3. create initial course progress
      const initialProgress = new UserCourseProgress({
        userId,
        courseId,
        enrollmentDate: new Date().toISOString(),
        overallProgress: 0,
        sections: course.sections.map((section: any) => ({
          sectionId: section.sectionId,
          chapters: section.chapters.map((chapter: any) => ({
            chapterId: chapter.chapterId,
            completed: false,
          })),
        })),
        lastAccessedTimestamp: new Date().toISOString(),
      });
      await initialProgress.save();
  
      // 4. add enrollment to relevant course
      await Course.update(
        { courseId },
        {
          $ADD: {
            enrollments: [{ userId }],
          },
        }
      );
  
      res.json({
        message: "Purchased Course successfully",
        data: {
          transaction: newTransaction,
          courseProgress: initialProgress,
        },
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating transaction and enrollment", error });
    }
  };