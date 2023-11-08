//Timer Class
class Timer
{
    //Assigns Variable Values
    constructor(start_seconds, sites, event)
    {
        this.start_seconds = start_seconds;
        this.seconds = start_seconds;
        this.alarm_event = event;
        this.social_sites = sites;
        this.timer_interval = null;
        this.active = false;
    }

    //Sets a Reference to the Tick Interval Object
    setTimerInterval(interval)
    {
        this.timer_interval = interval;
    }

    getTimerInterval(interval)
    {
        return this.timer_interval;
    }

    setActive(state)
    {
        this.active = state;
    }

    getActive()
    {
        return this.active;
    }

    //Returns the List of Social Media Sites
    getSites()
    {
        return this.social_sites;
    }

    //Decrements the Timer and Triggers Event at 0
    tick()
    {
        console.log(this.seconds);

        this.seconds -= 1;

        if (this.seconds <= 0)
        {
            this.reset();
            this.alarm_event();
        }
    }

    //Resets the Timer and Stops Ticking
    reset()
    {
        this.seconds = this.start_seconds;
        clearInterval(this.timer_interval);
        this.timer_interval = null;
        this.active = false;
    }
};

//Function: pop_up
//Purpose: ?????????
function pop_up()
{
    //Integrate Later
    console.log("brainteaser");
};

//Function: getCurrentTab
//Purpose: Gets the URL of the Current Tab
//Function is Incomplete
async function getCurrentTab()
{
    let query_options = { active: true, lastFocusedWindow: true};
    let [tab] = await chrome.tabs.query(query_options);
    
    if (tab === undefined)
    {
        return "UNDEFINED";
    }

    return tab.url;
    
};

//Function: site_match
//Purpose: Checks If the Current Tab Matches a Social Media Site
async function site_match(timer)
{ 
    var url_found = false;
    var url = await getCurrentTab(); //Needs to Be Tested
    //var url = "https://www.facebook.com/";
    var sites = timer.getSites();

    for (let i = 0; i < sites.length; i++) 
    {
        if (url.includes(sites[i]))
        {
            url_found = true;
        }
    }

    return url_found;
};

//Function: timer_tick
//Purpose: Handles the Ticking of the Timer, Or Stops It If the User Is No Longer Browsing Social Media
async function timer_tick(timer)
{
    var url_found = await site_match(timer);
    if (url_found === true)
    {
        timer.tick();
    }
    else
    {
        timer.reset();
    }
};

//Function: url_check
//Purpose: Checks if the User Has Started Browsing Social Media
async function url_check(timer)
{
    if (timer.getActive() === false)
    {
        var url_found = await site_match(timer);

        if (url_found === true && timer.getActive() === false)
        {
            var timer_interval = setInterval(timer_tick, 1000, timer);
            timer.setTimerInterval(timer_interval);
            timer.setActive(true);
            //clearInterval(url_interval);
        }
        else if (timer.getTimerInterval() != null)
        {
            timer.reset();
        }
    }
};


//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------


//Main Stuff
var social_media_sites = ["https://www.instagram.com/", "https://www.facebook.com/"];
var recheckTime = 2000; //2 Seconds Refresh Time
var timer = new Timer(20.0 * 60.0, social_media_sites, pop_up);
var url_interval = setInterval(url_check, recheckTime, timer);