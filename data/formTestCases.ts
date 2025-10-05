export const formTestCases = [
    {
        testName: "Valid credentials with Option 1",
        username: "validUser1",
        password: "ValidPass123",
        option: "Option 1",
    },
    {
        testName: "Valid credentials with Option 2",
        username: "validUser2",
        password: "ValidPass456",
        option: "Option 2",
    },
    {
        testName: "Empty username",
        username: "",
        password: "ValidPass123",
        option: "Option 1",
    },
    {
        testName: "Empty password",
        username: "validUser",
        password: "",
        option: "Option 1",
    },
    {
        testName: "Special characters in username",
        username: "user@#$%",
        password: "ValidPass123",
        option: "Option 2",
    }
];