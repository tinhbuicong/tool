Create file for udpate database

- tie_toe_user datababse
  data types:

  id: number
  device_id: string
  device_token: number
  device_name: text
  password: string
  os_name: string
  elo: double
  os_version: string
  version_app: string
  created_at: number
  updated_at: number

- tie_toe_ad_games database
  data types:

  thumb: string
  title: string
  description: string
  ads: string
  link: string

insert socket with following status

- create file socket join two user to a room with following status:
  create: check if not have room is available create room
  waiting: waiting for opponent
  joined: return 2 user data with device_name, elo and 2 user are joined and 2 user can play
  disconnect: return data usser is disconected
