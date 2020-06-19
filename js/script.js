'use strict';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  /* [DONE]remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE]add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE]remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE]get 'href' attribute from the clicked link */
  const clickedHref = clickedElement.getAttribute('href');

  /* [DONE]find the correct article using the selector (value of 'href' attribute) */
  const clickedArticle = document.querySelector(clickedHref);
  /* [DONE]add class 'active' to the correct article */
  clickedArticle.classList.add('active');

};

{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list';

  function generateTitleLinks(customSelector = '') {
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');
      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      /* insert link into titleList */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  }
  generateTitleLinks();

  function generateTags(){
    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    
    
    /* START LOOP: for every article: */
    for (let article of articles) {
    /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray){
        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        /* add generated code to html variable */
        html = html + " "+ linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else allTags[tag]++;
      }
      console.log(allTags);
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;
    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] add html from allTags to tagList */
    tagList.innerHTML = allTags.join(' ');
      
  }
    
  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();
  
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
  
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
  
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
  
    /* find all tag links with class active */
    const actveLinks = document.querySelectorAll('.list a.active');
  
    /* START LOOP: for each active tag link */
    for (let activeLink of actveLinks){
      /* remove class active */
      activeLink.classList.remove('active');
    /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(tag);
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks){
      /* add class active */
      tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }
  
  function addClickListenersToTags(){
    /* find all links to tags */ 
    /* START LOOP: for each link */
    /* add tagClickHandler as event listener for that link */
    /* END LOOP: for each link */
    const links = document.querySelectorAll('.list a');

    for (let link of links) {
      link.addEventListener('click', tagClickHandler);
    }

  }
  
  addClickListenersToTags();

  function generateAuthors(){
    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      let html = '';
      const author = article.getAttribute('data-author'); 
      const linkHTML = '<a href="#author-' + author + '"><span>' + author + '</span></a>';
      html = html + " "+ linkHTML;
      authorWrapper.innerHTML = '';
      authorWrapper.innerHTML = html;
    }    
  }
    
  generateAuthors();

  function authorClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');
    const actveLinks = document.querySelectorAll('.post-author a.active');
    for (let activeLink of actveLinks){
      activeLink.classList.remove('active');
    }
    const authorLinks = document.querySelectorAll(author);
    for (let authorLink of authorLinks){
      authorLink.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  }
  
  function addClickListenersToAuthors(){
    const links = document.querySelectorAll('.post-author a');

    for (let link of links) {
      link.addEventListener('click', authorClickHandler);
    }
  }
  addClickListenersToAuthors(); 
  

}
