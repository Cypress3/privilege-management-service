const express = require("express");

const router = express.Router();

let accessToken = "init_s_token"; //定义token
let role = ""; //定义用户等级
let permission = {}; //定义菜单列表和按钮权限

/* 5s刷新一次token */
setInterval(() => {
	accessToken = "s_tk" + Math.random();
}, 5000);

router.get("/login", (req, res) => {
	const { name } = req.query;
	switch (name) {
		case "admin":
			role = "admin";
			//管理员能看到首页，声明页和管理页
			permission = {
				"/home": [],
				"/declare": ["admin"], //声明页的按钮只有管理员可看
				"/manage": [],
			};
			break;
		default:
			role = "visitor";
			//游客只能看到首页，声明页
			permission = {
				"/home": [],
				"/declare": ["admin"], //声明页的按钮只有管理员可看
			};
			break;
	}
	res.json({
		role,
		accessToken,
		permission,
	});
});

router.get("/getData", (req, res) => {
	const { authorization } = req.headers;
	if (authorization !== accessToken) {
		res.json({
			returncode: 104,
			info: "token过期,重新登录",
		});
	} else {
		res.json({
			code: 200,
			returncode: 0,
			data: { id: Math.random() },
		});
	}
});

module.exports = router;