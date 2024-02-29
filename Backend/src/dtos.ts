export interface User 
{
    // id          :number       
    firstName   :string
    lastName    :string
    userName    :string
    email       :string
    password    :string
    avatar      :string
    // servers     :Server[]
}

export interface Server {
    id       :number
    name     :string
    users    :User[]
}
