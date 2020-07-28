const isUserCorrect = (username, email, birthdate) => {
  const usernameCH = username.length > 0 && username.length <= 50
  const emailCh = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email.toLowerCase()
  )
  // In case there is no birthdate mentioned, it passes the test.
  let birthdateCh = birthdate === undefined
  if (!birthdateCh && parseInt(new Date(birthdate).valueOf())) {
    birthdateCh = new Date(birthdate).valueOf() <= new Date().valueOf()
  }
  if (usernameCH && emailCh && birthdateCh) {
    return true
  } else {
    return {
      username: usernameCH,
      email: emailCh,
      birthdate: birthdateCh,
    }
  }
}

exports.isUserCorrect = isUserCorrect
