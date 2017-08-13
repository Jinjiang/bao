# What is Dabao?

_Dabao_ is a tool to build JS bundle of web apps easily and simple, which is based on [webpack](https://webpack.js.org/) currently.

The name **"Dabao"** means "packaging" (and also means "takeaway") in [Chinese Pinyin](https://zh.wikipedia.org/wiki/打包).

## Background

Today's web bundling job is too fragmented, over-designed and hard to learn. Each repo has its own special complex bundle config.

_Dabao_ is born to bring a simpler way to config webpack to make it easy to learn, read, create and maintain.

And we focus on web app bundling, especially in teamwork. which means it may not be very much useful to JS lib or personal web app.

You can read [getting started](getting-started.md) to begin.

## Principles

The keypoint of _Dabao_ is radical tradeoffs between necessity and fragmentation. It locks some doors which seems easily to be added but hard to maintain and hard to communicate/collaborate with other projects. At the same time the requirements under them could be solved in another way more clear and maintainable without complicating webpack config.

Another thing _Dabao_ does is make the config more clear and easy for common usage. It find some options which strictly speaking is for several different situations but only one of them web developers often use.

Thrid, _Dabao_ doesn't support very edge syntax / technology. It should be good for business/production team, however it's so cool for JS lib author to do some special job.

**In a word, you can only configure it when it's really necessary.**

You may find something different to your habit and no way to customize. But in another way it takes you to some habits which give you more common senses and be able to take more attentions to the "business level" you really care about.

Each tradeoff above has an article here to explain and help you understand why.

Hope you like it and any opinions and ideas are welcome.
