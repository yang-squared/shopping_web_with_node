exports.getPosts = (req, res, next) => {
    res.status(200).json ({
        post: [{
            title: "test",
            decription: "test"
        }]
    });
};