import express, { response } from "express";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes";
import { convertMinutesToHours } from "./utils/convert-minutes-to-hours";
import cors from "cors";


const app = express();

app
.use(express.json())
.use(cors());

const prisma = new PrismaClient();

app.get("/games", async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true
                }
            }
        }
    });
    return res.status(200).json(games);

});

app.post("/games/:id/ads", async (req, res) => {
    const gameId = req.params.id;
    const body: any = req.body;

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(","),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel
        }
    })

    return res.status(200).json(ad);

});

app.get("/games/:id/ads",  async (req, res) => {
    const gameId = req.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            game: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return res.status(200).json(ads.map((ad) => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(","),
            hourStart: convertMinutesToHours(ad.hourStart),
            hourEnd: convertMinutesToHours(ad.hourEnd)
        }
    }));

});

app.get("/ads/:id/discord", async (req, res) => {
    const adId = req.params.id;
    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true
        },
        where: {
            id: adId
        }
    });
    return res.status(200).json({discord: ad.discord})
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
    
})