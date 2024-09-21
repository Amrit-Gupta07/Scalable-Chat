import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const index = async (req, res) => {
    try {
        const groups = await prisma.chatGroup.findMany({
            where: {
                user_id: req.user.id,
            },
            orderBy: {
                created_at: 'desc',
            }
        });
        return res.json({ data: groups });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};
const show = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const group = await prisma.chatGroup.findUnique({
                where: {
                    id: id,
                }
            });
            return res.json({ data: group });
        }
        return res.json(404).json({ message: "Group not found" });
    }
    catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};
const store = async (req, res) => {
    try {
        const body = req.body;
        const user = req.user;
        const group = await prisma.chatGroup.create({
            data: {
                title: body.title,
                passcode: body.passcode,
                user_id: user.id
            }
        });
        return res.json({ message: "Group created successfully", data: group });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const group = await prisma.chatGroup.update({
            data: {
                title: body.title,
                passcode: body.passcode,
            },
            where: {
                id: id,
            }
        });
        return res.json({ message: "Group updated successfully", data: group });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
const destory = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            await prisma.chatGroup.delete({
                where: {
                    id: id,
                }
            });
        }
        return res.json({ message: "Group deleted successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
export { show, store, index, update, destory };
