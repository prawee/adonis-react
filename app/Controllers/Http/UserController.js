/*
 * @Author: Prawee Wongsa prawee.w@integra8t.com 
 * @Date: 2019-03-27 14:38:01 
 * @Last Modified by: Prawee Wongsa
 * @Last Modified time: 2019-03-27 15:30:33
 */

'use strict'

const User = use('App/Models/User')

class UserController {
    async login({ request, response, auth }) {
        const { email, password } = request.only(['email', 'password'])
        const token = await auth.attempt(email, password)
        return response.json(token)
    }

    async register({ request, response }) {
        const { first_name, last_name, email, password } = request.only([
            'first_name', 'last_name',
            'email', 'password'
        ])
        const exist = await User.findBy('email', email)
        if (exist)
            return response.status(500).send({ message: 'Email already exist.'})

        await User.create({
            first_name,
            last_name,
            email,
            password
        })
        return response.send({ message: 'User has been created'})
    }

    async show({ params, response }) {
        const user = await User.find(params.id)
        const res = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        }
        return response.json(res)
    }
}

module.exports = UserController
