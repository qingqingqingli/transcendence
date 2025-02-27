[![Logo](https://github.com/qingqingqingli/readme_images/blob/master/codam_logo_1.png)](https://github.com/qingqingqingli/webserv)

# ft_transcendence
***In this project, we need to build a website that allows users to chat and play pong matches against each other.***

This is a group project completed by [Q. Li](https://github.com/qingqingqingli) & [R. Bakker](https://github.com/rbakker96) & [G. Bouwen](https://github.com/gbouwen) & [thimovandermeer](https://github.com/thimovandermeer).

## Main technical requirements
> Full details are included in the `ft_transcendence_subject.pdf` file. The main requirements include:

- **Security concerns**:
	- Any password stored in your database must be `encrypted`
	- Your website must be protected against `SQL injections`
	- You must implement some kind of `server-side validation` for forms and any user
input
- **User Account**:
	- A user must log in using the `OAuth system of 42 intranet`
	- A user must be able to choose a `unique name` that will be displayed on the website
	- A user has several `victories` and `losses` and other stats
	- A user must have an `avatar` generated or uploaded by the user
	- A user must be able to activate a `2-factor authentication`
	- A user can add other users as `friends`, and see their current status
- **Chat**:
	- Users must be able to `create channels` public/private or protected by a password
	- Users must be able to `send direct messages` to other users
	- Users must be able to `block other user` and therefore they will not see their messages anymore
	- Through the chat interface users must be able to see `other players profiles`
- **Game**:
	- Be able to `play pong directly` on the website and live against another player.
	- There must be `a match-making system`, user can join a game queue and are automatically matched with another player.


## Tech stack

- Programming language: `TypeScript`
- Frontend library: `React`
- Backend framework: `NestJS`
- Database: `PostgreSQL`
- Application management: `docker-compose`

## How to test
> As this project runs with `docker-compose`, you need to install Docker before running the commands below.

```shell
$ git clone https://github.com/qingqingqingli/ft_transcendence.git
$ cd ft_transcendence
$ sh setup.sh
```

- Enter `localhost:8080` to be directed to the login page
[![login](https://github.com/qingqingqingli/ft_transcendence/blob/master/images/login.png)](https://github.com/qingqingqingli/ft_transcendence)

- Only 42 users can sign up to become a user
[![signup](https://github.com/qingqingqingli/ft_transcendence/blob/master/images/signup.png)](https://github.com/qingqingqingli/ft_transcendence)

- User homepage
[![profile](https://github.com/qingqingqingli/ft_transcendence/blob/master/images/user_profile.png)](https://github.com/qingqingqingli/ft_transcendence)

- User can decide to join a waiting room to be matched for a pong game
[![game_waitingroom](https://github.com/qingqingqingli/ft_transcendence/blob/master/images/game_waitingroom.png)](https://github.com/qingqingqingli/ft_transcendence)


## Project wiki

> I have summarised all my learnings from this project in the Wiki:
- [React](https://github.com/qingqingqingli/ft_transcendence/wiki/React)
- [NestJS](https://github.com/qingqingqingli/ft_transcendence/wiki/NestJS)
- [TypeScript](https://github.com/qingqingqingli/ft_transcendence/wiki/TypeScript)
- [TypeORM](https://github.com/qingqingqingli/ft_transcendence/wiki/TypeORM)
