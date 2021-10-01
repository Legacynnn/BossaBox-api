import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()


class ToolController {
    async getTools(req: Request, res: Response, next: any) {
        if(Object.keys(req.query).length !== 0) {
            return next()
        } else {
            const tools = await prisma.tool.findMany()
            res.json(tools)
        }
    }

    async createTool(req: Request, res: Response) {

        const {title, link, description, tags} = req.body

        const tool = await prisma.tool.create({
            data: {
                title: title,
                link: link,
                description: description,
                tags: tags
            }
        })
        return res.json(tool)
    }

    async filterByTag(req: Request, res: Response) {
        if (!req.query.tag) {
            res.status(400).json({error: "Please Search by one tag"})
        }
        
        const reqTag = req.query.tag as string

        const tags = await prisma.tool.findMany({
            where: {
                tags: {
                    has: reqTag
                }
            }
        })

        return res.json(tags)


    }
}

export default ToolController