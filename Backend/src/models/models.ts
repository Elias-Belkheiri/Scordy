interface Server {
    id: number;
    name: string;
}

let servers: Server[] = [{id: 1, name: 'Server1'}, {id: 2, name: 'Server2'}];

export {servers};

/*

Server {
    Channel[]   channels;
    User[]      members;
    User[]      blockedUsers;
}

Channel {
    Message[]  messages;
    User[]      members;
    bool        private;
}

Message {
    String  message;
    User    sender;
    Date    date;
}

UsersDMs {
    Message[]   messages;
    User[]      users;
}

User {
    String fullName;
    String username;
    String email;
    Server servers;

    /// Relations
    User   friends;
    User   pendingUsers;
    User   blockedUsers;
}

/* To enter a server you need an Invitation Link;

*/