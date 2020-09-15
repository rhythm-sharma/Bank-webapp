## Description

 It's a web app created using ReactJS which allow users to keep track of all their transactions and capitals.

Login and Signup functionality using localStorage and sessionStorage,
As it is a Bank site so It has two more features which makes it more secure.
 - The user's session is stored in sessionStorage, so if the user closes the website tab then the user's session will be expired and the user needs to log in again.
 - Hashing, AES(Advanced Encryption Standard)  is used to encrypt and decrypt the credentials data.

In the Transactions page,
 - The “From” field is a drop-down with the user’s bank account number(s)
 - The “To” field is a drop-down with a list of recipients.
Both the above values are generated for the user when the user signup for a new account.

In the Capital page,
users can apply for loans by uploading documents.
 - The “Document” field is a drop-down to select the type of document (driver’s license, PAN card, and Adhar card).
 - The user can drag the file to the “Drag file here” field or click it to open a file uploader.
caveat: user can't preview the document which is uploaded. I wasn't able to implement the functionality as I wasn't able to ask the query due to lack of time.

In Tables,
 - Filter feature to filter out transactions.
 - Sorting feature to sort the transaction table based on date, name, amount, etc.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
