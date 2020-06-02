import tkinter as tk
import requests
import threading
import json
import urllib.parse
import time , threading

items = [];
link = 'http://steamcommunity.com/market/priceoverview/?appid=570&market_hash_name=';
cur = '&curency=1'
global cycle
cycle = True


class Main (tk.Frame) :
	def __init__(self,root) :
		super().__init__(root)
		self.init_main()
		self.updateItems()
	def ex (self):
		return self
	def init_main(self) :
	 	headLayer = tk.Frame(bg = "#d7d8e0" , bd = 2)
	 	headLayer.pack(side = tk.TOP , fill = tk.X)
	 	headText = tk.Label(headLayer, fg = "#000000"  , text = "STEAM BUYER" , bd = 2 , font = "fantasy 36" )
	 	headText.pack(fill = tk.X , side = tk.TOP)
	 	
	 	self.itemsLayer = tk.Frame( bg = "#000000", )
	 	self.itemsLayer.pack(side = tk.TOP , fill = tk.X)
	 	Text1 = tk.Button(self.itemsLayer, fg = "#000000"  , text = "Желаемые предметы" ,command = self.updateItems, bd = 0 , font = "candara 18" )
	 	Text1.pack(fill = tk.X , side = tk.TOP)
	 	itemLayer1 = tk.Frame(self.itemsLayer)
	 	itemLayer1.pack(side = tk.TOP , fill = tk.X)
	 	itemName1 = tk.Label(itemLayer1, fg = "#ffffff"  ,bg = "#9ba9ab" , text = "Название" , bd = 3 , font = "candara 14" , width = 50)
	 	itemName1.pack(side = tk.LEFT)
	 	itemPrice1 = tk.Label(itemLayer1, fg = "#ffffff"  ,bg = "#9ba9ab" , text = "Цена" , bd = 3 , font = "candara 14" , width = 18)
	 	itemPrice1.pack(side = tk.RIGHT)
	 	addButton = tk.Button(self.itemsLayer, text = "Добавить предмет" ,command = self.openAddMenu, fg = "#008068", font = "candara 16",  bd = 1)
	 	addButton.pack(side = tk.BOTTOM , fill = tk.X)
	 	numsLayer = tk.Frame(self.itemsLayer,bg = "#d7d8e0" , bd = 2 , height = 20)
	 	numsLayer.pack(side = tk.BOTTOM , fill = tk.X)
	 	number1 = tk.Button(numsLayer, fg = "#000000" ,bg = "#d7d8e0" , text = "1" , bd = 0 , font = "candara 13" )
	 	number1.pack(side = tk.BOTTOM)
	 	buttonsLayer1 = tk.Frame(bd = 10)
	 	buttonsLayer1.pack(side = tk.TOP , fill = tk.X)
	 	startButton = tk.Button(buttonsLayer1, text = "Начать" ,command  = self.finding ,font = "candara 16" , bd = 2 , width = 25)
	 	startButton.pack(side = tk.LEFT)
	 	endButton = tk.Button(buttonsLayer1, text = "Стоп" ,command = self.end, font = "candara 16", bd = 2 , width = 25)
	 	endButton.pack(side = tk.RIGHT)

	def openAddMenu (self) : 
	 	Child()

	def finding (self) :
		def process () :
			cycle = True
			i = 0
			while cycle == True :
				name = items[i].split('   ')[0]
				price = items[i].split('   ')[1]
				res = requests.get(link + urllib.parse.quote(name) + cur)  
				data = json.loads(res.content)
				print(name , '\n' , data['lowest_price'])
				i += 1
				if(i == len(items)):
					i=0
				time.sleep(60)
		x = threading.Thread(target = process , daemon = True)
		x.start()
	def end (self) :
		cycle = False

	def updateItems(self):
		f = open('items.txt', 'r')
		text = f.read()
		arr = text.split('\n')
		if text == '' : 
			return 0
		for i in arr :
			if i == ''  :
				continue
			name = i.split('   ')[0]
			price = i.split('   ')[1]
			if(len(arr)-1 == len(items)):
				break
			if items.count(i) > 0:
				print(items.count(i))
				continue
			items.append(i)
			itemLayer2 = tk.Frame(self.itemsLayer)
			itemLayer2.pack(side = tk.TOP , fill = tk.X)
			itemName2 = tk.Label(itemLayer2, fg = "#ffffff"  ,bg = "#afb2b3"  , bd = 3 , font = "candara 14" , width = 50)
			itemName2['text'] = name
			itemName2.pack(side = tk.LEFT)
			itemPrice2 = tk.Label(itemLayer2, fg = "#ffffff"  ,bg = "#afb2b3" , bd = 3 , font = "candara 14" , width = 18)
			itemPrice2['text'] = price + '$'
			itemPrice2.pack(side = tk.RIGHT)
			
		f.close()

class Child (tk.Toplevel) :
	def __init__(self):
		super().__init__(root)
		self.init_child()

	def init_child (self) :
		self.title("Добавить Предмет")
		self.geometry("500x200+700+300")
		self.resizable(False,False);
		self.grab_set()
		self.focus_set()
		self.headLayer = tk.Frame(self ,bg = "#d7d8e0" , bd = 10)
		self.headLayer.pack(side = tk.TOP , fill = tk.X)
		self.Text1 = tk.Label(self.headLayer, fg = "#000000"  , text = "Название" , bd = 2 , font = "candara 15" )
		self.Text1.pack(fill = tk.X , side = tk.TOP)
		self.input1 = tk.Entry(self.headLayer, fg = "#000000"   , bd = 1 , font = "candara 13" )
		self.input1.pack(fill = tk.X , side = tk.TOP)
		self.Text2 = tk.Label(self.headLayer, fg = "#000000"  , text = "Цена $$$" , bd = 2 , font = "candara 15" )
		self.Text2.pack(fill = tk.X , side = tk.TOP)
		self.input2 = tk.Entry(self.headLayer, fg = "#000000"  , bd = 1 , font = "candara 13" )
		self.input2.pack(fill = tk.X , side = tk.TOP)
		addButton = tk.Button(self.headLayer, text = "Добавить предмет" ,command = self.addItem, fg = "#008068", font = "candara 16",  bd = 1)
		addButton.pack(side = tk.BOTTOM , fill = tk.X)
		self.Text = tk.Label(self.headLayer, fg = "#000000"  , text = "" , bd = 1 , font = "candara 12" )
		self.Text.pack(fill = tk.X , side = tk.BOTTOM)

	def addItem (self) :
		self.name = self.input1.get()
		self.price = self.input2.get()
		request = requests.get(link + urllib.parse.quote(self.name) + cur)
		if request.status_code != 200 :
			self.Text['fg'] = '#ff0000'
			self.Text['text'] = "Такого предмета не существует"
			return 0
		f = open('items.txt', 'r')
		allText = f.read()
		f.close()
		f = open('items.txt', 'w')
		f.write(allText + self.name + '   ' + self.price + '\n')
		f.close()
		self.input1.delete(0, len(self.name))
		self.input2.delete(0 , len(self.price))
		self.Text['fg'] = '#00ff00'
		self.Text['text'] = "Предмет успешно добавлен"
		


if __name__ == '__main__' :
	root = tk.Tk();
	app = Main(root)
	app.pack()
	root.title("STEAM BUYER")
	root.geometry('700x600+600+200')
	root.resizable(False,False);
	root.mainloop()