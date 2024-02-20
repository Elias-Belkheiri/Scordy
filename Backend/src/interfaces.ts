export interface User 
{
    id          :number
    fullName    :string
    userName    :string
    email       :string
    password    :string
    avatar      :string
    servers     :Server[] | any
}

export interface Server {
    id              :number
    name            :string
    moderators      :User[] | any
    members         :User[] | any
}

export interface Message {
    id              :number
    sender          :User
    content         :string
    Channel         :Channel
    date            :Date
}

export interface Channel {
    id              :number
    name            :string
    type            :string
    messages        :Message[]
    server          :Server
    privateMembers  :User[]
}