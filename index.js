

const singin = () => {
   const userName = "admin"
    const userPassword = "admin123"
    const userNameId = document.getElementById("Username").value
    const userPasswordId = document.getElementById("Password").value


    if (userName === userNameId && userPassword === userPasswordId) {
       window.location.href = "./isshu.html"
    }
    else {
        alert(" Invalid credential")
    }
}
