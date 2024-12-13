"use strict";

import { z } from "zod";

export const programsSchema = z.object({
    title: z.string().min(1, { message: "A title is required."}),
})