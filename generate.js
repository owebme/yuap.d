var libs = process.cwd() + '/libs/';
var config = require(libs + 'config');
var utils = require(libs + 'utils');
var validator = require('validator');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var tempus = require('tempusjs');

MongoClient.connect(config.get('mongodb:uri'), function(err, db) {

	db.collection('status').drop();
	db.collection('tags').drop();
	db.collection('sites').drop();
	db.collection('users').drop();

	db.collection('accounts').drop();
	db.collection('data').drop();

	var data = [];
	for (var i = 1; i < 101; ++i){
		data.push(table.data(i));
	}
	var count1 = 0; var count2 = 0;
	for (var i = 0; i < 100; i++){
		count1++; count2++;
		var metrika = data[i].metrika[0];
		if (count1 > 2){
			count1 = 0;
			if (count2 > 4){
				data[i - 1].metrika.push(metrika);
				count2 = 0;
				data[i].state = "contact";
			}
			else {
				data[i].name = null;
				data[i].phone = null;
				data[i].email = null;
				data[i].status = 1;
			}
		}
		var searchEngine = metrika.searchEngine;
		if (searchEngine === "yandex" || searchEngine === "google"){
			metrika.adv = true;
		}
	}
	db.collection('accounts').insert(accounts);
	db.collection('events').insert(events);
	db.collection('events').ensureIndex({accountID: 1});

	db.collection('data').insert(data);
	db.collection('data').ensureIndex({accountID: 1});
	db.collection('data').ensureIndex({siteID: 1, clientID: 1}, {unique: true});
});

var ACCOUNT_ID = "1",
	USER_ID = ObjectId(),
	SITE_ID = "777";

var table = {
	get: function(row){
		var result = this[row]();
		return this.shuffle(result);
	},
	shuffle: function(data){
		var rand = Math.floor(Math.random() * data.length);
		return data[rand];
	},
	random: function(min,max){
		return Math.floor(Math.random()*(max-min+1)+min);
	},
	chanel: function(){
		return ["callback", "messenger", "reviews", "tweet"];
	},
	city: function(){
		return ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург", "Нижний Новгород", "Казань", "Челябинск", "Омск", "Самара", "Ростов-на-Дону", "Уфа", "Красноярск", "Пермь", "Воронеж", "Волгоград"];
	},
	name: function(){
		return ["Александр Викторович", "Алексей Владимирович", "Денис Евгеньевич", "Евгений Александрович", "Дмитрий Сергеевич", "Сергей Витальевич", "Виталий Андреевич", "Станислав Алексеевич", "Роман Игорьевич", "Артем Иванович", "Виктория Евгеньевна", "Ирина Андреевна", "Наталья Сергеевна", "Людмила Виктровна", "Любовь Владимировна", "Мария Витальевна", "Надежда Игоревна", "Вероника Генадьевна", "Светлана Романовна", "Юлия Григорьевна"];
	},
	company: function(){
		return ["РАО ЭC Востока", "ФК Уралсиб", "Русэнергосбыт", "МРСК Центра", "МРСК Центра", "Волжская ТГК (ТГК-7)", "Тюменьэнерго", "Волга-Днепр", "ДСК-1", "Сильвинит", "Новоросцемент", "Каустик", "Эфко", "Центртелеком", "Фаворит моторс", "Тюменьэнерго", "Термосервис", "Спортмастер", "Рольф"];
	},
	photo: function(){
		var sex = this.shuffle(["men", "women"]);
		var data = [];
		for (var i = 1; i < 100; ++i){
			data.push('https://randomuser.me/api/portraits/'+ sex +'/'+ i +'.jpg');
		}
		return data;
	},
	email: function(){
		return ["alex.u1986@mail.ru", "alexey.k1981@mail.ru", "denis.k1983@gmail.com", "denis.s1991@gmail.com", "dmitr.k1971@mail.ru", "sergey.s1986@mail.ru", "vitaly.i1981@gmail.com", "stas.e1982@gmail.com", "roman.n1974@mail.ru", "artem.a1962@mail.ru", "viktory.s1974@gmail.com", "irina.p1967@gmail.com", "nataly.l1976@mail.com", "luda.m1977@mail.ru", "love.s1967@gmail.com", "maria.d1978@gmail.com", "nadya.p1967@mail.ru", "veronika.h1987@mail.com", "sveta.a1974@gmail.com", "uliya.u1982@gmail.com"];
	},
	phone: function(){
		return ["79018942839", "79017459265", "79363746729", "79631094657", "79584915498", "79585925128", "79629459632", "79620197143", "79638874376", "79634882398", "79641873455", "79646492693", "79655836077", "79653884631", "79775673978", "79771599421", "7926042877", "79261894423", "79293128856", "79298539948"];
	},
	status: function(){
		return [2, 3, 4, 5];
	},
	tag: function(){
		var tags = accounts[0].tags,
			data = [];
		for (var i = 0; i < tags.length; ++i){
			data.push(tags[i]._id);
		}
		return data;
	},
	visits: function(){
		var data = [];
		for (var i = 1; i < 4; ++i){
			data.push(i);
		}
		return data;
	},
	date: function(){
		var data = [];
		for (var i = 1; i < 30; ++i){
			var day = i,
				month = this.random(7, 8);
			if (month === 8) day = this.random(1, 7);
			data.push(tempus({year: 2016, month: month, day: day}).format('%Y-%m-%d %H:%M'));
		}
		return data;
	},
	metrikaSearchEngine: function(){
		return ["yandex", "google", "rambler", "mail", "yahoo", "bing"];
	},
	metrikaKeywords: function(){
		return ["коммерческая недвижимость", "московская недвижимость", "аренда недвижимости", "недвижимость продажа квартир", "недвижимость в области", "недвижимость без посредников", "снять недвижимость", "недвижимость в москве", "вторичная недвижимость", "недвижимость вторичка", "покупка недвижимости", "оценка недвижимости", "недорогая недвижимость", "недвижимость недорого", "новая недвижимость", "московские объявления недвижимость", "сделки с недвижимостью", "недвижимость куплю продажа", "налог на недвижимость физических"];
	},
	metrikaTime: function(){
		return [this.random(30, 600)];
	},
	data: function(num){
		var item = {
			accountID: ACCOUNT_ID,
			siteID: SITE_ID,
			userID: USER_ID,
			clientID: (100 + num),
			num: num,
			new: false,
			state: "inbox",
			chanel: this.get("chanel"),
			profile: {
				id: "158013862",
				url: "http://vk.com/moshamakeeva"
			},
			city: this.get("city"),
			photo: this.get("photo"),
			name: this.get("name"),
			company: this.get("company"),
			email: this.get("email"),
			phone: this.get("phone"),
			phones: [],
			important: false,
			alarm: false,
			accepted: null,
			status: this.get("status"),
			tags: [this.get("tag")],
			date: validator.toDate(this.get("date")),
			params: [],
			visits: this.get("visits"),
			metrika: [
				{
					chanel: this.get("chanel"),
					device: "pc",
					platform: "macOS",
					browser: "Chrome",
					ip: "127.0.0.1",
					startPage: "/catalog/svetodiody",
					actionPage: "/pages/contacts",
					referer: "https://yandex.ru/search/?msid=1462914682.87109.22884.29544&text=refferer&suggest_reqid=427504009146291468246849369785529",
					adv: false,
					searchEngine: this.get("metrikaSearchEngine"),
					keyword: this.get("metrikaKeywords"),
					time: this.get("metrikaTime"),
					pages: [
						'/catalog/svetodiody',
						'/catalog/svetodiodnye-lenty',
						'/pages/oplata-i-dostavka',
						'/pages/contacts'
					],
					dateStart: validator.toDate("2016-04-07 11:24"),
					dateEnd: validator.toDate("2016-04-07 11:34")
				}
			]
		}
		if (num == 1){
			item.new = true;
			item.status = 1;
		}
		if (item.type == "reviews"){
			item.name = null;
			item.phone = null;
		}
		return item;
	}
}

var events = [];

var accounts = [
	{
		_id: ACCOUNT_ID,
		users: [
			{
				_id: USER_ID,
				admin: true,
				photo: "https://pp.vk.me/c631525/v631525862/31fa6/wGLCQfdOO4g.jpg",
				name: "Александр",
				city: "Москва",
				username: "admin",
				password: utils.cryptoPass("1234"),
				balance: 4750.00,
				create: validator.toDate("2016-04-22 11:21"),
				visite: validator.toDate("2016-04-22 11:21")
			}
		],
		sites: [
			{
				_id: SITE_ID,
				domain: "resumekraft.ru"
			}
		],
		status: [
			{
				_id: "1",
				title: "Новый",
				color: 0
			},
			{
				_id: "2",
				title: "В работе",
				color: 6
			},
			{
				_id: "3",
				title: "Думает",
				color: 3
			},
			{
				_id: "4",
				title: "Согласование",
				color: 9
			},
			{
				_id: "5",
				title: "Оплачен",
				color: 14
			}
		],
		tags: [
			{
				_id: "1",
				title: "БР",
				visible: true
			},
			{
				_id: "2",
				title: "БРВ",
				visible: true
			},
			{
				_id: "3",
				title: "БУТ",
				visible: true
			},
			{
				_id: "4",
				title: "ВП",
				visible: true
			},
			{
				_id: "5",
				title: "ВПП",
				visible: true
			},
			{
				_id: "6",
				title: "ДГ",
				visible: true
			},
			{
				_id: "7",
				title: "ДЕР",
				visible: true
			},
			{
				_id: "8",
				title: "ЖКУ",
				visible: true
			},
			{
				_id: "9",
				title: "ИНД",
				visible: true
			},
			{
				_id: "10",
				title: "КАМ",
				visible: true
			}
		]
	}
];
