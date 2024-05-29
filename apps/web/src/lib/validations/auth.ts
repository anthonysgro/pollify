import * as z from 'zod'

export const userSignInSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const userRegisterSchema = z
    .object({
        email: z.string().email(),
        password: z.string(),
        confirm: z.string().optional(),
    })
    .superRefine(({ password, confirm }, checkPassComplexity) => {
        const containsUppercase = (ch: string) => /[A-Z]/.test(ch)
        const containsLowercase = (ch: string) => /[a-z]/.test(ch)
        const containsSpecialChar = (ch: string) =>
            /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(ch)
        let countOfUpperCase = 0,
            countOfLowerCase = 0,
            countOfNumbers = 0,
            countOfSpecialChar = 0

        for (let i = 0; i < password.length; i++) {
            let ch = password.charAt(i)
            if (!isNaN(+ch)) countOfNumbers++
            else if (containsUppercase(ch)) countOfUpperCase++
            else if (containsLowercase(ch)) countOfLowerCase++
            else if (containsSpecialChar(ch)) countOfSpecialChar++
        }

        let errObj = {
            upperCase: {
                pass: true,
                message: 'Password requires an uppercase character.',
            },
            lowerCase: {
                pass: true,
                message: 'Password requires an uppercase character.',
            },
            specialCh: {
                pass: true,
                message: 'Password requires a special character.',
            },
            totalNumber: { pass: true, message: 'Password requires a number.' },
        }

        if (countOfLowerCase < 1) {
            errObj = {
                ...errObj,
                lowerCase: { ...errObj.lowerCase, pass: false },
            }
        }
        if (countOfNumbers < 1) {
            errObj = {
                ...errObj,
                totalNumber: { ...errObj.totalNumber, pass: false },
            }
        }
        if (countOfUpperCase < 1) {
            errObj = {
                ...errObj,
                upperCase: { ...errObj.upperCase, pass: false },
            }
        }
        if (countOfSpecialChar < 1) {
            errObj = {
                ...errObj,
                specialCh: { ...errObj.specialCh, pass: false },
            }
        }

        Object.values(errObj)
            .filter(({ pass }) => pass != true)
            .forEach(({ message }) => {
                checkPassComplexity.addIssue({
                    code: 'custom',
                    path: ['password'],
                    message,
                })
            })

        if (confirm !== password) {
            checkPassComplexity.addIssue({
                code: 'custom',
                message: "Passwords don't match",
                path: ['confirm'],
            })
        }
        if (password.trim().length === 0) {
            checkPassComplexity.addIssue({
                code: 'custom',
                path: ['password'],
                message: 'Required',
            })
        }
    })
