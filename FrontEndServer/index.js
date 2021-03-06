module.exports = (context, req) => {
  const isDevEnv = process.env.NODE_ENV === 'development'
  const favicon = isDevEnv ? `"http://127.0.0.1:10000/devstoreaccount1/public/favicon.gif"` : `"https://mediagarden0frontend.blob.core.windows.net/public/favicon.gif"`
  const header_photo = isDevEnv ? `http://127.0.0.1:10000/devstoreaccount1/public/header_photo.jpg` : `https://mediagarden0frontend.blob.core.windows.net/public/header_photo.jpg`
  const bundle = isDevEnv ? `"bundle.js"` : `"bundle.min.js"`
  const homepage = `
  <!DOCTYPE html>
  <html lang="en" itemscope itemtype="https://schema.org/WebPage">
  <head>
      <meta charset="UTF-8" />
      <title>Media Garden - Missouri State University</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Media Garden" />
      <meta itemprop="name" content="Media Garden" />
      <meta name="theme-color" content="#5E0009" />
      <link rel="Stylesheet" media="all" href="//missouristate.info/styles/2015/global.aspx" />
      <link rel="icon" type="image/gif" href=` + favicon + ` />
      <style>
          /*<img src="https://missouristate.info/images/2015/template/facebook_share.jpg" width="1200" height="630" />*/
      </style>
      <script src="//missouristate.info/scripts/2015/common.js"></script>
      <style>
          .UnitMastheadWrapper .SiteBranding {
              height: 346px;
              background: #303031 url(` + header_photo + `) no-repeat center center;
              background-size: cover;
          }

          @media screen and (max-width: 959px) {
              .UnitMastheadWrapper .SiteBranding {
                  height: 346px;
              }
          }

          .Phone .UnitMastheadWrapper .SiteBranding {
              height: 104px;
          }
      </style>

  </head>
  <body class="Homepage">
      <div id="PageOuterWrapper">
          <header id="Masthead">
              <div id="MastheadInner">
                  <div class="Logo">
                      <div>
                          <a href="https://www.missouristate.edu/">
                              <img src="//missouristate.info/images/2015/template/sgf-logo.png" width="226" height="87" alt="Missouri State University" />
                          </a>
                      </div>
                  </div>
                  <nav>
                      <a href="#PageInnerWrapper" class="SkipNav">
                          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Skip search and site index" width="1" height="1" />
                      </a>
                      <div id="MastheadControls">
                          <div class="BearPass">
                              <a>BearPass</a>
                          </div>
                          <div class="SiteIndex">
                              <a>A-Z</a>
                          </div>
                          <div class="Search">
                              <form action="https://search.missouristate.edu/" method="get">
                                  <label for="Keywords">
                                      <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Enter keyword:" width="1" height="1" />
                                  </label><input type="search" name="q" id="Keywords" placeholder="Search" /><input type="image" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" width="1" height="1" alt="Go" />
                              </form>
                          </div>
                      </div>
                  </nav>
              </div>
          </header>
          <nav id="SearchContainer">
              <div class="BearPassLogin"></div>
              <div class="SiteIndex">
                  <a href="https://search.missouristate.edu/siteindex/a">a</a>
                  <a href="https://search.missouristate.edu/siteindex/b">b</a>
                  <a href="https://search.missouristate.edu/siteindex/c">c</a>
                  <a href="https://search.missouristate.edu/siteindex/d">d</a>
                  <a href="https://search.missouristate.edu/siteindex/e">e</a>
                  <a href="https://search.missouristate.edu/siteindex/f">f</a>
                  <a href="https://search.missouristate.edu/siteindex/g">g</a>
                  <a href="https://search.missouristate.edu/siteindex/h">h</a>
                  <a href="https://search.missouristate.edu/siteindex/i">i</a>
                  <a href="https://search.missouristate.edu/siteindex/j">j</a>
                  <a href="https://search.missouristate.edu/siteindex/k">k</a>
                  <a href="https://search.missouristate.edu/siteindex/l">l</a>
                  <a href="https://search.missouristate.edu/siteindex/m">m</a>
                  <a href="https://search.missouristate.edu/siteindex/n">n</a>
                  <a href="https://search.missouristate.edu/siteindex/o">o</a>
                  <a href="https://search.missouristate.edu/siteindex/p">p</a>
                  <a href="https://search.missouristate.edu/siteindex/q">q</a>
                  <a href="https://search.missouristate.edu/siteindex/r">r</a>
                  <a href="https://search.missouristate.edu/siteindex/s">s</a>
                  <a href="https://search.missouristate.edu/siteindex/t">t</a>
                  <a href="https://search.missouristate.edu/siteindex/u">u</a>
                  <a href="https://search.missouristate.edu/siteindex/v">v</a>
                  <a href="https://search.missouristate.edu/siteindex/w">w</a>
                  <a href="https://search.missouristate.edu/siteindex/x">x</a>
                  <a href="https://search.missouristate.edu/siteindex/y">y</a>
                  <a href="https://search.missouristate.edu/siteindex/z">z</a>
              </div>
          </nav>
          <div id="PageInnerWrapper">
              <div id="UnitMastheadWrapper" class="grid_container UnitMastheadWrapper Default">
                  <header id="UnitMasthead" class="UnitMasthead">
                      <div class="SiteTitle">
                          <h1>Media Garden</h1>
                      </div>
                  </header>
                  <nav class="Breadcrumb">
                      <div id="Breadcrumb">
                          <span itemscope itemtype="https://data-vocabulary.org/Breadcrumb"><a href="https://www.missouristate.edu/" itemprop="url"><span itemprop="title">Missouri State</span></a></span> &gt;
                          <span itemscope itemtype="https://data-vocabulary.org/Breadcrumb"><a href="https://mjf.missouristate.edu/" itemprop="url"><span itemprop="title">Media Journalism and Film</span></a></span> &gt;
                          Media Garden
                      </div>
                  </nav>
                  <div class="SiteBranding"></div>
              </div>
              <div class="grid_container MainContent">
                  <nav class="grid_fourth MainNav" id="MainNav">
                      <a href="#ContentColumn" class="SkipNav">
                          <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="Skip page navigation" width="1" height="1" />
                      </a>
                      <div class="grid_inner">

                          <div class="LocalNav">
                              <nav class="ContentBlock">
                                  <h2>Media Garden</h2>
                                  <ul>
                                      <li><a href="https://mediagarden.missouristate.edu/">Home</a></li>
                                      <li><a href="http://mjfproduction.missouristate.edu/">Production Center</a></li>
                                      <li><a href="https://mjf.missouristate.edu/">Media Journalism and Film</a></li>
                                  </ul>
                              </nav>
                          </div>

                          <div class="GlobalNav">
                              <nav class="ContentBlock FSFB">
                                  <h2>
                                      Follow your passion.<br />
                                      Find your place.
                                  </h2>
                                  <ul>
                                      <li><a href="https://www.missouristate.edu/futurestudents/"><span class="future"></span><span>Future Students</span></a></li>
                                      <li><a href="https://www.missouristate.edu/futurestudents/requestinfo.aspx"><span class="info"></span><span>Request Info</span></a></li>
                                      <li><a href="https://www.missouristate.edu/admissions/seecampus.htm"><span class="campus"></span><span>See Campus</span></a></li>
                                      <li><a href="https://www.missouristate.edu/academics/"><span class="majors"></span><span>Explore Majors</span></a></li>
                                      <li><a href="https://www.missouristate.edu/futurestudents/applynow.aspx"><span class="apply"></span><span>Apply Online</span></a></li>
                                  </ul>
                              </nav>
                          </div>
                      </div>
                  </nav>
                  <main id="ContentColumn" class="grid_threefourths ContentColumn">
                    <div id="root">
                      <h4>Media Garden is currently under construction. Please pardon our progress...</h4>
                      <!-- React app is rendered here -->
                    </div>
                  </main>
              </div>
          </div>
          <footer class="PageFooter HasSocialFooter" id="PageFooter">

              <div class="SocialFooter">
                  <div class="SocialInner">
                      <h2>Connect with <span class="UnitName">Media Journalism and Film</span></h2>
                      <ul class="Icons">

                          <li class="Facebook">
                              <a href="https://www.facebook.com/MSU.MediaJournalismFilm">
                                  <img srcset="//missouristate.info/images/2015/template/social-sprite.png 1.5x, //missouristate.info/images/2015/template/social-sprite-1x.png 1x" src="//missouristate.info/images/2015/template/social-sprite.png" width="203" height="152" alt="Facebook" />
                              </a>
                          </li>

                          <li class="Twitter">
                              <a href="https://twitter.com/MSU_MJF">
                                  <img srcset="//missouristate.info/images/2015/template/social-sprite.png 1.5x, //missouristate.info/images/2015/template/social-sprite-1x.png 1x" src="//missouristate.info/images/2015/template/social-sprite.png" width="203" height="152" alt="Twitter" />
                              </a>
                          </li>

                          <li class="YouTube">
                              <a href="https://www.youtube.com/user/MJFMissouriState">
                                  <img srcset="//missouristate.info/images/2015/template/social-sprite.png 1.5x, //missouristate.info/images/2015/template/social-sprite-1x.png 1x" src="//missouristate.info/images/2015/template/social-sprite.png" width="203" height="152" alt="YouTube" />
                              </a>
                          </li>

                      </ul>

                      <p class="Hashtag"><a href="https://twitter.com/search?q=%23MissouriState">#MissouriState</a></p>

                  </div>
              </div>

              <div class="MYMS">
                <a href="https://www.missouristate.edu/about/">
                  <img src="//missouristate.info/images/2016/template/myms-footer.png" alt="Make your Missouri statement" class="DisplayOnly"/>
                  <img src="//missouristate.info/images/2016/template/myms-feature.png" alt="Make your Missouri statement" class="PrintOnly"/>
                </a>
              </div>

              <div class="Legal">
                  <div class="Row">
                      <ul>
                          <li>
                              Last Modified:
                              <script type="text/javascript">missouristate.outputLastModifiedDate();</script>
                          </li>
                          <li>
                              <ul class="Sublist">
                                  <li><a href="https://www.missouristate.edu/disclaimer/">Disclaimer</a></li>
                                  <li><a href="https://www.missouristate.edu/campusservices/fedmaninfo.htm">Disclosures</a></li>
                                  <li><a href="https://www.missouristate.edu/equity/nondiscrimination_statement.htm">EO/AA/M/F/Veterans/Disability</a></li>
                              </ul>
                          </li>
                      </ul>
                  </div>
                  <div class="Row">
                      <ul>
                          <li>&copy; 2013 <a href="https://www.missouristate.edu/bog/">Board of Governors</a>, <span>Missouri State University</span></li>
                          <li><a href="https://mjf.missouristate.edu/contact.htm">Contact Information</a></li>
                      </ul>
                  </div>
                  <div class="Row PrintOnly">
                      <ul>
                          <li>
                              <script type="text/javascript">missouristate.outputDocumentLocation();</script>
                          </li>
                      </ul>
                  </div>
              </div>
          </footer>
      </div>
      <!-- Core javascript -->
      <!--<script type="text/javascript" src=` + bundle + `></script>-->
  </body>
  </html>
  `
  context.res = {
    body: homepage,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  }
  context.done()
}
