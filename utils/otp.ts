export const maskPhoneNumber = (phoneNumber: any) => {
    // Replace the middle digits with asterisks
    const maskedNumber = phoneNumber.slice(0, 2) + "******" + phoneNumber.slice(-2);
    return maskedNumber;
}
