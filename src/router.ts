import {Router} from 'express'
import ToolController from './controllers/ToolController'


const router = Router()

const toolController = new ToolController()

router.get('/tools', toolController.getTools, toolController.filterByTag)
router.post('/tool', toolController.createTool)

export {router}