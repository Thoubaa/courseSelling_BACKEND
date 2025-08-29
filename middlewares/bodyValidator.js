



function validateBody(schema){
    return (req,res,next)=>{
        const result = schema.safeParse(req.body)
        if(!result.success){
            const errors  = result.error.errors.map(e=>({
                path: e.path,
                message : e.message   
            }))
            return res.status(400).send(errors)
        }
        req.body = result.data;
next();
    }
}

module.exports = {validateBody};