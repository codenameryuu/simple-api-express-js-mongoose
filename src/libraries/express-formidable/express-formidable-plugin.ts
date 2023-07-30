import formidable from "formidable";
import isset from "../../helpers/isset";

function parse(opts: any, events: any) {
  return (req: any, res: any, next: any) => {
    if (req.express_formidable && req.express_formidable.parsed) {
      next();
      return;
    }

    const form = new formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });
    
    Object.assign(form, opts);

    let manageOnError = false;

    if (isset(events)) {
      events.forEach((e: any) => {
        manageOnError = manageOnError || e.event === "error";
        form.on(e.event, (...parameters) => {
          e.action(req, res, next, ...parameters);
        });
      });
    }

    if (!manageOnError) {
      form.on("error", (err) => {
        next(err);
      });
    }

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }

      Object.assign(req, { fields, files, express_formidable: { parsed: true } });
      next();
    });
  };
}

export default parse;
