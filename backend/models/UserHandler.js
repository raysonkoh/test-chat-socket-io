class UserHandler {
  constructor() {
    this.users = [];
  }

  addUser(usr) {
    if (this.users.find(user => user.id === usr.id)) {
      return {err: 'User already exists'};
    } else {
      this.users.push(usr);
      return {user: usr};
    }
  }

  removeUser(usrId) {
    const usr = this.users.find(user => user.id === usrId);
    if (usr) {
      this.users.splice(this.users.indexOf(usr), 1);
        return {user: usr};
    } else {
      return {err: 'User does not exist'};
    }
  }
}

module.exports = UserHandler;
