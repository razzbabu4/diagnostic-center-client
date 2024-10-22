# Health Quest

## Admin Info.
For admin access, use the following credentials:
- Email: demo@email.com
- Password: Aa@123

## Necessary Link
- Live Link : https://diagnostic-center-manage-f4ff1.web.app
- Server Repository : https://github.com/razzbabu4/diagnostic-center-server

## Payment Card Info for Appointment
<!-- markdownlint-disable MD033 -->
<details>
<summary>Test Card Information</summary>

| Card Type                   | Card Number          | CVC          | Expiration Date  | ZIP Code      |
|-----------------------------|----------------------|--------------|------------------|---------------|
| Visa                        | 4242424242424242     | Any 3 digits | Any future date  | Any 5 digits  |
| Visa (debit)                | 4000056655665556     | Any 3 digits | Any future date  | Any 5 digits  |
| Mastercard                  | 5555555555554444     | Any 3 digits | Any future date  | Any 5 digits  |
| Mastercard (2-series)       | 2223003122003222     | Any 3 digits | Any future date  | Any 5 digits  |
| Mastercard (debit)          | 5200828282828210     | Any 3 digits | Any future date  | Any 5 digits  |
| Mastercard (prepaid)        | 5105105105105100     | Any 3 digits | Any future date  | Any 5 digits  |
| American Express            | 378282246310005      | Any 4 digits | Any future date  | Any 5 digits  |
| American Express            | 371449635398431      | Any 4 digits | Any future date  | Any 5 digits  |
| Discover                    | 6011111111111117     | Any 3 digits | Any future date  | Any 5 digits  |
| Discover                    | 6011000990139424     | Any 3 digits | Any future date  | Any 5 digits  |
| Discover (debit)            | 6011981111111113     | Any 3 digits | Any future date  | Any 5 digits  |
| Diners Club                 | 3056930009020004     | Any 3 digits | Any future date  | Any 5 digits  |
| Diners Club (14-digit card) | 36227206271667       | Any 3 digits | Any future date  | Any 5 digits  |
| BCcard and DinaCard         | 6555900000604105     | Any 3 digits | Any future date  | Any 5 digits  |
| JCB                         | 3566002020360505     | Any 3 digits | Any future date  | Any 5 digits  |
| UnionPay                    | 6200000000000005     | Any 3 digits | Any future date  | Any 5 digits  |
| UnionPay (debit)            | 6200000000000047     | Any 3 digits | Any future date  | Any 5 digits  |
| UnionPay (19-digit card)    | 6205500000000000004  | Any 3 digits | Any future date  | Any 5 digits  |

</details>
<!-- markdownlint-enable MD033 -->

## Features
- Secure Login: Email/password login with Firebase Authentication.
- User Registration: Sign up with name, avatar, blood group, district, and upazila.
- User Dashboard: Manage appointments and view test results.
- Appointment Booking: Search, book, and cancel tests with real-time slot availability.
- Dynamic Homepage: Display promotions, featured tests, and health tips.
- Admin Dashboard: Manage users, tests, and banners.
- Test Results: Upload, view, and download test results.
- Payments: Secure payments with Stripe and apply discount codes.
- PDF Reports: Generate and download detailed user reports.
- Statistics: Visual charts of most booked tests and service status.

## Technologies Used in this Project
- ReactJS
- JavaScript
- TailwindCSS
- Express.js
- MongoDB

## Run the Project Locally
1. **Clone the Repository**:

    ```sh
    git clone https://github.com/razzbabu4/diagnostic-center-client.git
    cd diagnostic-center-client
    ```

2. **Install Dependencies**:

    ```sh
    npm install
    ```

3. **Set Up Environment Variables**: Create a `.env.local` file in the root directory and add the necessary environment variables. (**Important!**)

4. **Run the Application**:

    ```sh
    npm run dev -- --host
    ```

5. **Access the Site**: Open your browser and go to `http://localhost:5173/` or `http://192.168.1.12:5173/` from other devices on the same network to view the application.
