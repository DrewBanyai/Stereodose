# Stereodose Service
This service acts as a single entity which controls all API calls for the Stereodose site. The calls are as follows:

## /user/ routes 
	
> POST API/user/register
	- accepts Username and Password values in JSON
	- returns Result and Token value in JSON

> POST API/user/login
	- accepts Username and Password values in JSON
	- returns Token value in JSON

> POST API/user/delete
	- accepts Username and Password values in JSON
	- returns result value in JSON

> POST API/user/getFavorites
	- accepts Username and Password values in JSON
	- returns favorites list value in JSON
	

## /playlist/ routes

> POST API/playlist/create
	- accepts Name, Description, ImageSource, and TrackList values in JSON
	- returns Result and PlaylistID in JSON
	
> POST API/playlist/delete
	- accepts PlaylistID value in JSON
	- returns Result in JSON
	
> POST API/playlist/details
	- accepts PlaylistID value in JSON
	- returns PlaylistName, PlaylistDescription, and Tracklist values in JSON

> POST API/playlist/favorite
	- accepts Username, Password, and PlaylistID, value in JSON
	- returns Result in JSON

> POST API/playlist/randomGroup
	- accepts an empty body
	- returns Result in JSON

## /admin/ routes

> POST API/admin/getAllPlaylists
	- accepts AdminPasscode value in JSON
	- returns Playlist collection in JSON

> POST API/admin/getAllUsers
	- accepts AdminPasscode value in JSON
	- returns User collection in JSON
