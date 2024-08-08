// Соединяем бота
require('dotenv').config();
const { Bot, GrammyError, HttpError, Keyboard, InlineKeyboard } = require('grammy');
const bot = new Bot(process.env.BOT_API_KEY);

// Вешаем команды и их описание



bot.api.setMyCommands([
	{
		command: 'start',
		description: 'Старт бота',
	},
	{
		command: 'inline_keyboard',
		description: 'Клавиатура',
	}
	// {
	// 	command: 'support',
	// 	description: 'Необходима помощь сотрудника тех. поддержки',
	// },
	// {
	// 	command: 'id',
	// 	description: 'Узнать свой ID Telegram',
	// },
	// {
	// 	command: 'contact',
	// 	description: 'Отправить Ваш контакт',
	// },
	// {
	// 	command: 'location',
	// 	description: 'Отправить Вашу локацию',
	// },
])


// Вешаем слушателя на конкретную команду тг

bot.command('start', async (ctx) => {
	await ctx.react("❤")
	await ctx.reply('<b>HelloSkillsWeb</b> приветствует Вас, выберите подходящую команду бота', {
		parse_mode: 'HTML'
	})
});


// bot.command('start', async (ctx) => {
// 	await ctx.react("❤")
// 	await ctx.reply('Бот запущен', {
// 		parse_mode: 'HTML'
// 	})
// });

// bot.command('support', async (ctx) => {
// 	await ctx.reply('Ваш запрос принят, пожалуйста, ожидайте - тех. поддержка скоро свяжется с Вами')
// });

// bot.command('id', async (ctx) => {
// 	await ctx.reply(`Ваш ID <b><span class="tg-spoiler">${ctx.from.id}</span></b>`, {
// 		parse_mode: 'HTML'
// 		// parse_mode: 'MarkdownV2' *жирный*
// 	})
// });

// bot.command('contact', async (ctx) => {
// 	const shareKeyboard = new Keyboard().requestContact('Контакт').resized().oneTime().placeholder('Нажмите кнопку')
// 	await ctx.reply('Если хотите отправить Ваш контакт - нажмите кнопку', {
// 		reply_markup: shareKeyboard
// 	})
// });

// bot.command('location', async (ctx) => {
// 	const shareKeyboard = new Keyboard().requestLocation('Локация').resized().oneTime().placeholder('Нажмите кнопку')
// 	await ctx.reply('Если хотите отправить Вашу локацию - нажмите кнопку', {
// 		reply_markup: shareKeyboard
// 	})
// });

bot.command('inline_keyboard', async (ctx) => {
	const inlineKeyboard = new InlineKeyboard().text('1', 'button-1').text('2', 'button-2').text('3', 'button-3')
	await ctx.reply('Нажмите кнопку', {
		reply_markup: inlineKeyboard
	})
});

// bot.callbackQuery(/button-1-3/, async (ctx) => {
// 	await ctx.answerCallbackQuery();
// 	await ctx.reply(`Вы выбрали кнопку: ${ctx.callbackQuery.data}`);
// });

bot.callbackQuery(/button-[1-3]/, async (ctx) => {
	await ctx.answerCallbackQuery('Выбор подтверждён!');
	await ctx.reply(`Вы выбрали кнопку: ${ctx.callbackQuery.data}`)
})
// Вариант колбека но уже попизже

// bot.on('callback_query:data', async (ctx) => {
// 	await ctx.answerCallbackQuery();
// 	await ctx.reply(`Вы выбрали кнопку: ${ctx.callbackQuery.data}`);
// });



//Вешаем колбэкквери на ответ по кнопкам
// Вариант не самый лучший

// bot.callbackQuery(['button-1', 'button-2', 'button-3'], async (ctx) => {
// 	await ctx.answerCallbackQuery('Выбор подтверждён!');
// 	await ctx.reply('Вы выбрали цифру')
// })



// Вешаем слушателя на любые другие сообщения

// Полный лог информации

bot.on('msg', async (ctx) => {
	console.log(ctx.msg);
	await ctx.reply(ctx.msg)
});


// Обработчик контакта

// bot.on('msg', async (ctx) => {
// 	// Ловим контакт в лог

// 	console.log(ctx.msg.contact);
// 	await ctx.reply(`Спасибо, мы получили Ваш контакт ` + `+` + ctx.msg.contact.phone_number)
// });

// // Обработчик для локации

// bot.on('msg', async (ctx) => {
// 	// Ловим контакт в лог
// 	console.log(ctx.msg.location);
// 	await ctx.reply(`Спасибо, мы получили Вашу локацию ` `latitude: ` + ctx.msg.location.latitude + `, longitude:` + ctx.msg.location.longitude)
// });

// bot.on('message', async (ctx) => {
// 	console.log(ctx.msg)
// 	if (ctx.message.contact) {
// 		await ctx.react("❤")
// 		await ctx.reply(`Спасибо, мы получили Ваш контакт ` + `+` + ctx.msg.contact.phone_number)
// 	} else if (ctx.message.location) {
// 		await ctx.react("❤")
// 		await ctx.reply(`Спасибо, мы получили Вашу локацию - ` + `Latitude: ` + ctx.msg.location.latitude + `, Longitude:` + ctx.msg.location.longitude)

// 	} else {
// 		await ctx.react("🥴")
// 		await ctx.reply('Такой команды нет, соболезную :\'\(')
// 	}
// });


// Обработчик ошибок

bot.catch((err) => {
	const ctx = err.ctx;
	console.log(`Error while handling update ${ctx.update.update_id}:`);
	const e = err.error;

	if (e instanceof GrammyError) {
		console.error("Error in request:", e.description)
	} else if (e instanceof HttpError) {
		console.error("Could not contact Telegram", e);
	} else {
		console.error("Unknow error", e);
	}
});

// Запуск бота

bot.start();


// Temp info

// .oneTime() - юзать только один раз
// .resized() - изменение размеров относительно экрана
// .row() - перенос на некст строку


// Temp

// bot.on('msg', async (ctx) => {
// 	console.log(ctx.from);
// 	await ctx.reply(ctx.from)
// });

// Обработка войса и других типов

// bot.on('message:voice', async (ctx) => {
// 	await ctx.reply('Войс, серьёзно?')
// });

// Слушатель по тексту

// bot.hears(['Слово', 'СЛОВО'], async (ctx) => {
// 	await ctx.reply('Перехватил слово!')
// });

// Выцепляет текст из сообщения

// bot.hears([/пипец/, /Пипец/], async (ctx) => {
// 	await ctx.reply('Ругаемся?')
// });


// Фильтры

// bot.on('msg').filter((ctx) => {
// 	return ctx.from.id = 418814235
// }, async (ctx) => {
// 	await ctx.reply('Привет, админ!')
// })



