export const messages = {
    error: 'There was an error'
}
export const views = {
    welcome: {
        header: "Welcome to Pyxis!",
        message: "Pyxis is still under active development, and while the version you are viewing is the most stable the" +
        "re may still be bugs. At the bottom right there is a report a bug button, before you use it try clearing your cache" +
        " first, which on chrome is ctrl+shift+r (windows) or cmd+shift+r (mac). This will guarantee you are using the latest version" +
        " of the site. Thanks!",
        messageStyle: "warning"
    }
};
export const modals = {
    deleteModal: {
        title: "Delete",
        text: "Are you sure you want to delete that task?",
        button: 'Delete',
        close: 'Close'
    },
    userModal:{
        first_name: "First Name",
        last_name: "Last Name",
        uid: "Univeristy ID",
        email: "University Email",
        button: "Register",
        title: "Add User",
        directory_id: "Directory ID"
    },
    orgModal:{
        name: "Name",
        button: "Create",
        title: "Add Organization"
    },
    latchModal:{
        name: "Name",
        button: "Create",
        title: "Latch Overview",
        battery : "Battery",
        status: "Status",
        delay: "Delay",
        serial: "Serial_no"
    },
    flushModal:{
        name: "Name",
        button: "Create",
        title: "Flush Overview",
        battery : "Battery",
        status: "Status",
        delay: "Delay",
        serial: "Serial_no"
    },
    loginModal:{
        name: "Name",
        button: "Create",
        title: "Login",
        password: "Password",
        email: "Email",
        remember: "Remember Login?"
    }
}


export const buttons = {
    daysButton: {
        makeRecurring: {
            title: 'Select Days of the week',
            button: 'Confirm Days'
        },
        days: {
            Monday: 'M',
            Tuesday: 'T',
            Wednesday: 'W',
            Thursday: 'Th',
            Friday: 'F'
        },
        ends: {
            month: 'Month',
            semester: 'Semester',
            ever: 'Ever'
        },
        selectedColor: '#113111',
        deselectedColor: '#331333'
    }
    ,
    logoutButton:{
        button: "Logout",
        title: "Login",
        password: "Password",
        email: "Email",
        remember: "Remember Login?"
    },
    loveButton:{
        button: "Show Hydraze Some Love"
    },
    downloadButton:{
        button: "Download"
    },
}
export const taskTable = {
    first: "Name",

}
export const adminPanel = {}
export default {messages, views, buttons, modals, taskTable};