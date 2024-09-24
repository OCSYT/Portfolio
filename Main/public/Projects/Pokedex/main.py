import pandas as pd
from hashlib import sha256
import requests
import json
import tkinter
import customtkinter
import io
import numpy as np
from PIL import ImageTk, Image

current_username = ""
current_password = ""
API_URL = "https://pokeapi.co/api/v2/"
SPRITE_URL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"
MAX_POKEMON = 6

def GetPokemonIdfromUrl(url):
    parts = url.split("/")
    pokemon_id = parts[-2]
    return pokemon_id


def Init():
  #setup the file
  try:
    user_data = pd.read_csv("UserData.csv")
  except:
    f = open("UserData.csv", "a")
    f.write("username,password")
    f.close()


Init()

#data storage



def StringHash(text: str):
  return str(sha256(str(text).encode('utf-8')).hexdigest())


def VerifyAccount(password):
  user_data = pd.read_csv("UserData.csv")
  usernames = user_data["username"]
  if list(user_data["username"]).__contains__(current_username) != True:
    return True

  i = 0
  for user in usernames:
    if ((str(user_data.iloc[i]["password"]) == StringHash(password) or
         (user_data.iloc[i]["password"]) == None)
        and str(user_data.iloc[i]["username"] == current_username)):
      return True
    i = i + 1
  return False


def GetData(username, column_name):
  if not VerifyAccount(current_password):
    return None
  user_data = pd.read_csv("UserData.csv")
  usernames = user_data["username"]

  if username not in list(usernames):
    print("username not found")
    return None

  if user_data.get(column_name) is None:
    print("collumn not found")
    return None

  i = 0
  for user in usernames:
    if user == username:
      value = user_data.at[i, column_name]
      if np.isnan(value):
         return None
      else:
         return value
    i = i + 1

  print("failed to get a value")
  return None


def SaveData(username, collumn_name, input_data):
  if not VerifyAccount(current_password):
    return False
  user_data = pd.read_csv("UserData.csv")
  usernames = user_data["username"]

  if username not in list(usernames):
    user_data.loc[len(list(usernames)) + 1] = {
        "username": username,
        collumn_name: input_data
    }

  if user_data.get(collumn_name) is None:
    newData = pd.DataFrame({collumn_name: [None]})
    user_data.join(newData)

  i = 0
  for user in usernames:
    if user == username:
      user_data.at[i, collumn_name] = input_data
      break
    i = i + 1
  user_data.to_csv("UserData.csv", index=False)
  return True


def DeleteData(username, collumn_name, deleterow):
  if not VerifyAccount(current_password):
    return False
  user_data = pd.read_csv("UserData.csv")
  usernames = user_data["username"]
  i = 0
  for user in usernames:
    if user == username:
      if deleterow is True:
        user_data.drop(user_data.index[[i]], inplace=True)
        break
      else:
        if user_data.get(collumn_name) is None:
          newData = pd.DataFrame({collumn_name: [None]})
          user_data.join(newData)
        user_data.at[i, collumn_name] = None
        break
    i = i + 1
  user_data.to_csv("UserData.csv", index=False)
  return True


#account handling


def CreateAccount(new_username, new_password):
  user_data = pd.read_csv("UserData.csv")
  if list(user_data["username"]).__contains__(new_username) != True:
    SaveData(new_username, "password", StringHash(new_password))
    global current_username
    global current_password
    current_username = new_username
    current_password = new_password
    for i in range(0, MAX_POKEMON):
      SaveData(new_username, "pokemon_" + str(i), None)
    print("Account created: ", new_username, new_password)
    MainPage()
  else:
    print("Account Already exists")


def DeleteAccount(username):
  if DeleteData(username, None, True):
    print("Account deleted")
    Logout()
  else:
    print("Incorrect permissions")


def SwitchAccountName(newusername):
  if(newusername != ""):
    global current_username
    user_data = pd.read_csv("UserData.csv")
    if list(user_data["username"]).__contains__(newusername) != True:
      SaveData(current_username, "username", newusername)
      current_username = newusername


# login


def Login(username, password):
  user_data = pd.read_csv("UserData.csv")
  usernames = user_data["username"]
  if list(user_data["username"]).__contains__(username) != True:
    print("Account does not exist")
  else:
    i = 0
    for user in usernames:
      if user == username:
        correct_username = user_data.at[i, "username"] == username
        correct_password = user_data.at[i, "password"] == StringHash(password)
        if (correct_username and correct_password):
          print("Login success")
          MainPage()
          global current_username
          global current_password
          current_username = username
          current_password = password
          return True
        else:
          current_username = ""
          current_password = ""
          print("Incorrect username or password")

      i = i + 1


def Logout():
  global current_username
  global current_password
  current_username = ""
  current_password = ""
  print("Logged out")
  DisplayLogin()


# pokemon party system

def AddPokemon(pokemon_id, pokemon_slot, should_replace):
    # for i in range(MAX_POKEMON):
    #     existing_pokemon = GetData(current_username, "pokemon_" + str(i))
    #     if existing_pokemon == int(pokemon_id):
    #         return "Cannot have the same Pokemon twice."

    pokemon_available = 0
    if should_replace == False:
        for i in range(MAX_POKEMON):
            if GetData(current_username, "pokemon_" + str(i)) == None:
                pokemon_available = i
                break

    if should_replace:
        SaveData(current_username, "pokemon_" + str(pokemon_slot), int(pokemon_id))
        return "Added pokemon to party in slot " + str(pokemon_slot+1) + "."
    else:
        SaveData(current_username, "pokemon_" + str(pokemon_available), int(pokemon_id))
        return "Added pokemon to party in slot " + str(pokemon_available+1) + "."



def RemovePokemon(pokemon_slot):
  DeleteData(current_username, "pokemon_" + str(pokemon_slot), False)
  return "Deleted pokemon in slot " + str(pokemon_slot+1) + "."


# searching


def SearchType(type_name):
  try:
    response = requests.get(API_URL + "/type/" + str(type_name)).text
    if response:
      results = list(json.loads(response)["pokemon"])
      finalresults = []
      for i in range(0, len(results)):
        if (len(finalresults) < 100):
          finalresults.append({
              "name": results[i]["pokemon"]["name"],
              "url": results[i]["pokemon"]["url"]
          })
      return (finalresults)
    else:
      return None
  except:
    return None


def SearchPokemon(pokemon_id):
  try:
    response = requests.get(API_URL + "/pokemon/" + str(pokemon_id)).text
    if response:
      results = (json.loads(response)["forms"][0])
      finalresult = {"name": results["name"], "url": results["url"]}
      return [(finalresult)]
    else:
      return None
  except:
    return None


def Search(search_value: str):
  searchresult = None
  searchfortype = False
  response = requests.get(API_URL + "/type/").text
  if response:
    results = list(json.loads(response)["results"])
    for result in results:
      if search_value == result["name"]:
        searchfortype = True
        break
  if searchfortype:
    searchresult = SearchType(search_value.lower())
  else:
    searchresult = SearchPokemon(search_value.lower())
  print(searchresult)
  return searchresult



# UI

customtkinter.set_appearance_mode("Dark")
customtkinter.set_default_color_theme("blue")
app = customtkinter.CTk() 
app.geometry("720x400")
app.title("Pokedex")


def MainPage():
  for widget in app.winfo_children():
    widget.destroy()
    
    title = customtkinter.CTkLabel(app, text="Pokedex Home")
    title.place(relx=0.5, rely=0.1, anchor=tkinter.N)
    settings = customtkinter.CTkButton(app, text="Settings", command=Settings) 
    settings.place(relx=0.5, rely=0.9, anchor=tkinter.S)
    search = customtkinter.CTkButton(app, text="Search Pokemon", command=DisplaySearch) 
    search.place(relx=0.25, rely=0.5, anchor=tkinter.CENTER)
    partypage = customtkinter.CTkButton(app, text="Current Party", command=DisplayParty) 
    partypage.place(relx=0.75, rely=0.5, anchor=tkinter.CENTER)


def DisplayParty():
  for widget in app.winfo_children():
    widget.destroy()

  title = customtkinter.CTkLabel(app, text="Party")
  title.place(relx=0.5, rely=0.1, anchor=tkinter.N)

  back = customtkinter.CTkButton(app, text="Back", command=MainPage) 
  back.place(relx=0.5, rely=0.9, anchor=tkinter.S)


  positions = [0.25, 0.35, 0.45, 0.55, 0.65, 0.75]

  def DisplaySprite(url, relX, relY, relative):
      try:
        response = requests.get(url)
        image_data = response.content
        img = Image.open(io.BytesIO(image_data))
        sprite = customtkinter.CTkImage(light_image=img,
                                    dark_image=img,
                                    size=(150, 150))
        
        sprite_label = customtkinter.CTkLabel(app, text="", image=sprite)
        sprite_label.place(relx=relX, rely=relY, anchor=relative)
      except:
        pass
  
  def DeletePokemon(slot):
     print("pokemon_" + str(slot))
     DeleteData(current_username, "pokemon_" + str(slot), False)
     DisplayParty()


  def UpdateParty():
    for i in range(0, 6):
      CURRENT_POKEMON = GetData(current_username, "pokemon_" + str(i))
      POKEMON_DATA = SearchPokemon(int(CURRENT_POKEMON)) if CURRENT_POKEMON != None else [{"name": None, "url": None}]
      slottext = customtkinter.CTkLabel(app, text=str(i+1))
      slottext.place(relx=positions[i], rely=0.7, anchor=tkinter.S)
      pokemonText = customtkinter.CTkLabel(app, text=POKEMON_DATA[0]["name"] or "None")
      pokemonText.place(relx=positions[i], rely=0.6, anchor=tkinter.S)
      sprite_url = SPRITE_URL + str(int(CURRENT_POKEMON) if CURRENT_POKEMON != None else "None") + ".png"
      delete = customtkinter.CTkButton(app, text="Remove from party", command=lambda i=i: DeletePokemon(i)) 
      delete.place(relx=positions[i], rely=0.8, anchor=tkinter.S)

      DisplaySprite(sprite_url, positions[i], 0.5, tkinter.S)
  UpdateParty()

def Settings():
  for widget in app.winfo_children():
    widget.destroy()

  title = customtkinter.CTkLabel(app, text="Settings")
  title.place(relx=0.5, rely=0.1, anchor=tkinter.N)
  deleteaccount = customtkinter.CTkButton(app, text="Delete Account", command=lambda: DeleteAccount(current_username))
  deleteaccount.place(relx=0.5, rely=0.4, anchor=tkinter.CENTER)

  logout = customtkinter.CTkButton(app, text="Logout", command=Logout) 
  logout.place(relx=0.5, rely=0.5, anchor=tkinter.CENTER)

  usernamebox = customtkinter.CTkEntry(app, placeholder_text="Enter New Username")
  usernamebox.place(relx=0.5, rely=0.6, anchor=tkinter.CENTER)

  button = customtkinter.CTkButton(app, text="Confirm Switch", command=lambda: SwitchAccountName(usernamebox.get())) 
  button.place(relx=0.5, rely=0.7, anchor=tkinter.CENTER)

  back = customtkinter.CTkButton(app, text="Back", command=MainPage) 
  back.place(relx=0.5, rely=0.8, anchor=tkinter.S)

def DisplayLogin():
    for widget in app.winfo_children():
        widget.destroy()

    title = customtkinter.CTkLabel(app, text="Login")
    title.place(relx=0.5, rely=0.1, anchor=tkinter.N)

    usernamebox = customtkinter.CTkEntry(app, placeholder_text="Enter Username")
    usernamebox.place(relx=0.5, rely=0.3, anchor=tkinter.CENTER)

    passwordbox = customtkinter.CTkEntry(app, placeholder_text="Enter Password")
    passwordbox.place(relx=0.5, rely=0.4, anchor=tkinter.CENTER)


    button = customtkinter.CTkButton(app, text="Login", command=lambda: Login(usernamebox.get(), passwordbox.get())) 
    button.place(relx=0.5, rely=0.5, anchor=tkinter.CENTER)

    button = customtkinter.CTkButton(app, text="Switch to Register", command=DisplayRegister) 
    button.place(relx=0.5, rely=0.6, anchor=tkinter.CENTER)

def DisplayRegister():
    for widget in app.winfo_children():
        widget.destroy()

    title = customtkinter.CTkLabel(app, text="Register")
    title.place(relx=0.5, rely=0.1, anchor=tkinter.N)

    usernamebox = customtkinter.CTkEntry(app, placeholder_text="Enter Username")
    usernamebox.place(relx=0.5, rely=0.3, anchor=tkinter.CENTER)

    passwordbox = customtkinter.CTkEntry(app, placeholder_text="Enter Password")
    passwordbox.place(relx=0.5, rely=0.4, anchor=tkinter.CENTER)



    button = customtkinter.CTkButton(app, text="Register", command=lambda: CreateAccount(usernamebox.get(), passwordbox.get())) 
    button.place(relx=0.5, rely=0.5, anchor=tkinter.CENTER)

    button = customtkinter.CTkButton(app, text="Switch to Login", command=DisplayLogin)
    button.place(relx=0.5, rely=0.6, anchor=tkinter.CENTER)

def DisplaySearch():
    for widget in app.winfo_children():
        widget.destroy()
    
    title = customtkinter.CTkLabel(app, text="Search")
    title.place(relx=0.5, rely=0.1, anchor=tkinter.N)

    searchbar = customtkinter.CTkEntry(app, placeholder_text="Enter pokemon name, id, or type")
    searchbar.place(relx=0.5, rely=0.2, anchor=tkinter.N)
    
    sprite_label = None
    party_button = None
    party_status = None

    def AddToParty(pokemon_id):
       nonlocal party_status
       if party_status is not None:
        party_status.destroy()
        
       result = AddPokemon(pokemon_id, 0, False)
       party_status = customtkinter.CTkLabel(app, text=str(result))
       party_status.place(relx=0.5, rely=0.8, anchor=tkinter.S)

    def UpdateSearchResults(results):
        
        nonlocal party_button
        nonlocal sprite_label
        nonlocal party_status
        if party_status is not None:
          party_status.destroy()

        if results:
            if not hasattr(app, "result_label") or not app.result_label.winfo_exists():
                app.result_label = customtkinter.CTkLabel(app)
                app.result_label.place(relx=0.5, rely=0.4, anchor=tkinter.N)

            if not hasattr(app, "result_label2") or not app.result_label2.winfo_exists():
                app.result_label2 = customtkinter.CTkLabel(app)
                app.result_label2.place(relx=0.5, rely=0.45, anchor=tkinter.N)

            pokemon_id = GetPokemonIdfromUrl(results["url"])
            app.result_label.configure(text=results["name"])
            app.result_label2.configure(text=pokemon_id)

            sprite_url = SPRITE_URL + pokemon_id + ".png"
            DisplaySpriteSearch(sprite_url)

            if party_button is not None:
                  party_button.destroy()
            
            party_button = customtkinter.CTkButton(app, text="Add to party", command=lambda: AddToParty(pokemon_id)) 
            party_button.place(relx=0.5, rely=0.7, anchor=tkinter.N)

        else:
            if not hasattr(app, "result_label") or not app.result_label.winfo_exists():
                app.result_label = customtkinter.CTkLabel(app)
                app.result_label.place(relx=0.5, rely=0.4, anchor=tkinter.N)

            if not hasattr(app, "result_label2") or not app.result_label2.winfo_exists():
                app.result_label2 = customtkinter.CTkLabel(app)
                app.result_label2.place(relx=0.5, rely=0.45, anchor=tkinter.N)

            app.result_label.configure(text="None")
            app.result_label2.configure(text="None")


            if sprite_label is not None:
                  sprite_label.destroy()
            if party_button is not None:
                  party_button.destroy()

    def DisplaySpriteSearch(url):
      nonlocal sprite_label
      if sprite_label is not None:
            sprite_label.destroy()

      response = requests.get(url)
      image_data = response.content
      img = Image.open(io.BytesIO(image_data))
      sprite = customtkinter.CTkImage(light_image=img,
                                  dark_image=img,
                                  size=(150, 150))


      sprite_label = customtkinter.CTkLabel(app, text="", image=sprite)
      sprite_label.place(relx=0.5, rely=0.5, anchor=tkinter.N)



    
    search_results = []
    current_index = 0
    def SearchButtonPressed():
        nonlocal current_index
        nonlocal search_results
        current_index = 0
        search_results = Search(searchbar.get()) 
        if search_results:
            UpdateSearchResults(search_results[0]) 
        else:
            UpdateSearchResults(None)
            search_results = []
    
    search = customtkinter.CTkButton(app, text="Search", command=SearchButtonPressed) 
    search.place(relx=0.5, rely=0.3, anchor=tkinter.N)
    
  
    def NextResult():
        nonlocal current_index
        if current_index + 1 < len(search_results) and search_results[current_index + 1] is not None:
            current_index += 1
            UpdateSearchResults(search_results[current_index]) 
    
    def PreviousResult():
        nonlocal current_index
        if current_index - 1 >= 0 and search_results[current_index - 1] is not None:
            current_index -= 1
            UpdateSearchResults(search_results[current_index]) 
    
    nextResult = customtkinter.CTkButton(app, text="Next", command=NextResult) 
    nextResult.place(relx=0.7, rely=0.4, anchor=tkinter.N)
    
    previousResult = customtkinter.CTkButton(app, text="Back", command=PreviousResult) 
    previousResult.place(relx=0.3, rely=0.4, anchor=tkinter.N)
    
    # Back button
    back = customtkinter.CTkButton(app, text="Back to main", command=MainPage) 
    back.place(relx=0.5, rely=0.9, anchor=tkinter.S)

DisplayLogin()
app.mainloop()
