# Stereodose Service
This service acts as a single entity which controls all API calls for the Stereodose site. The calls are as follows:

1) POST API/user/login
	- accepts Username and Password values in JSON
	- returns Token value in JSON
	
2) POST API/user/register
	- accepts Username and Password values in JSON
	- returns Result and Token value in JSON
	
3) POST API/playlist/create
	- accepts Name, Description, ImageSource, and TrackList values in JSON
	- returns Result and PlaylistID in JSON
	
4) POST API/playlist/delete
	- accepts PlaylistID value in JSON
	- returns Result in JSON
	
5) POST API/playlist/details
	- accepts PlaylistID value in JSON
	- returns PlaylistName, PlaylistDescription, and Tracklist values in JSON

6) POST API/playlist/favorite
	- accepts PlaylistID, Username, and Password value in JSON
	- returns Result in JSON