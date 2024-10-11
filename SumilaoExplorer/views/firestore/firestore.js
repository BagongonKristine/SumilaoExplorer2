// Import the necessary Firebase functions
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getFirestore, collection, addDoc, updateDoc, doc, increment, getDoc } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDfOI2shBJqKGaKAewR-X6XNoOzPYP1lpA",
    authDomain: "capstone-project-49ca8.firebaseapp.com",
    projectId: "capstone-project-49ca8",
    storageBucket: "capstone-project-49ca8.appspot.com",
    messagingSenderId: "132663616309",
    appId: "1:132663616309:web:f7f440409eefa5ac94a27c",
    measurementId: "G-ECQBJXEB2V"
};

// Initialize Firebase, Firestore, and Storage
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Function to log events to Firestore
export const logEventToFirestore = async (collectionName, eventData) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), eventData);
        console.log("Document successfully written with ID: ", docRef.id);
    } catch (error) {
        console.error("Error writing document: ", error);
    }
};

// Example function to log Walu clicks
export const logWaluClick = async () => {
    const clickData = {
        character: "Walu",
        timestamp: new Date(),
        message: "Walu was clicked!"
    };
    await logEventToFirestore("walu_clicks", clickData);
    console.log("Walu click event recorded.");
};

// Function to calculate and update the average rating
const updateAverageRating = async (locationId, newRating) => {
    try {
        const locationRef = doc(db, "locations", locationId);
        const locationSnap = await getDoc(locationRef);

        if (locationSnap.exists()) {
            const locationData = locationSnap.data();
            const currentNumberOfReviews = locationData.numberOfReviews || 0;
            const currentTotalRating = (locationData.averageRating || 0) * currentNumberOfReviews;

            const updatedNumberOfReviews = currentNumberOfReviews + 1;
            const updatedTotalRating = currentTotalRating + newRating;
            const updatedAverageRating = updatedTotalRating / updatedNumberOfReviews;

            await updateDoc(locationRef, {
                numberOfReviews: updatedNumberOfReviews,
                averageRating: updatedAverageRating
            });

            console.log(`Location ${locationId} average rating updated to ${updatedAverageRating}.`);
        } else {
            console.error("No such location document!");
        }
    } catch (error) {
        console.error("Error updating average rating: ", error);
    }
};

// Function to add a review for a location
export const addReview = async (locationId, reviewData, imageFile) => {
    try {
        let imageUrl = null;

        // Upload image to Firebase Storage if provided
        if (imageFile) {
            const storageRef = ref(storage, `reviews/${locationId}/${imageFile.name}`);
            await uploadBytes(storageRef, imageFile);
            imageUrl = await getDownloadURL(storageRef);
        }

        // Add the review to the reviews collection
        const reviewRef = await addDoc(collection(db, "reviews"), { ...reviewData, image: imageUrl });
        console.log("Review added with ID: ", reviewRef.id);

        // Update the corresponding location document with the new review count
        await updateDoc(doc(db, "locations", locationId), {
            reviews: increment(1),
        });

        // Update the average rating
        await updateAverageRating(locationId, reviewData.rating);

    } catch (error) {
        console.error("Error adding review: ", error);
    }
};

// Example usage
// Assume this is called when a pinned location is clicked and a review is submitted
const onSubmitReview = async (locationId, username, comment, rating, imageFile) => {
    const reviewData = {
        username: username, // Get this from user input
        comment: comment, // Get this from user input
        rating: rating, // Get this from user input
        timestamp: new Date()
    };
    await addReview(locationId, reviewData, imageFile);
};

// Example call (you would typically pass these parameters based on user input)
onSubmitReview("locationId123", "John Doe", "Amazing place!", 5, selectedImageFile);
