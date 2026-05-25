import { db } from "../../firebaseConfig";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

export interface Transaction {
  userId: string;
  planId: string;
  planName: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "cancelled";
  transactionId?: string;
  orderId: string;
  paymentMethod?: string;
  errorMessage?: string;
  createdAt?: any;
  updatedAt?: any;
}

/**
 * Store a new transaction in Firebase
 */
export const createTransaction = async (
  transaction: Transaction,
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, "subscriptions"), {
      ...transaction,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw new Error("Failed to create transaction");
  }
};

/**
 * Update an existing transaction
 */
export const updateTransaction = async (
  transactionId: string,
  updates: Partial<Transaction>,
): Promise<void> => {
  try {
    const transactionRef = collection(db, "subscriptions");
    const q = query(transactionRef, where("__name__", "==", transactionId));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw new Error("Failed to update transaction");
  }
};

/**
 * Get user's transaction history
 */
export const getUserTransactions = async (
  userId: string,
): Promise<Transaction[]> => {
  try {
    const q = query(
      collection(db, "subscriptions"),
      where("userId", "==", userId),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as any);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
};

/**
 * Get user's active subscription
 */
export const getUserActiveSubscription = async (
  userId: string,
): Promise<Transaction | null> => {
  try {
    const q = query(
      collection(db, "subscriptions"),
      where("userId", "==", userId),
      where("status", "==", "completed"),
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    // Return the most recent active subscription
    const transactions = snapshot.docs.map((doc) => doc.data());
    return transactions.sort(
      (a: any, b: any) => b.createdAt?.seconds - a.createdAt?.seconds,
    )[0] as Transaction;
  } catch (error) {
    console.error("Error fetching active subscription:", error);
    return null;
  }
};
