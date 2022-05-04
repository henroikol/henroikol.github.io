



const webhookUrl = "https://discord.com/api/webhooks/971076083640311808/9Y5oOdrPVNPuZset1H-SAI_pVO-Dzwc5B42IuJsqip6hAhpf2QdTqKePREJIzywstKmJ"
const ipAddresWebsiteUrl = "https://api.ipify.org?format=json"

// time
var today = new Date()
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

// ohter

var Url = document.location.href
var doctitle = document.title

var bodydata = {
    "username": doctitle,
    
    "content": "Somebody is on the website: " + Url,
    "embeds" : [
        
        {"title": "The time of the user: ",
          "description" : time,
          "color" : 1752220
         
        },
        {"title": "The IP of the user: ",
          "description" : "not known",
          "color" : 15158332
        },
        {"title": "The date of the user: ",
          "description" : date,
          "color" : 16777215
        }
    ]
  }

const getIpAndPost = async () => {
    const response = await fetch(ipAddresWebsiteUrl);
    const json = await response.json();
    var IP = json.ip
    bodydata.embeds[1].description = IP
    
    postData(webhookUrl,bodydata)

}







function postData(url, data) {
    
    fetch(url, {
	method: 'POST',
	body: JSON.stringify(data),
	headers: {
		'Content-type': "application/json; charset=UTF-8"
	}

    })
}



getIpAndPost()

