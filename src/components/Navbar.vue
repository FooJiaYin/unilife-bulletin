<template>
    <!-- header nav start-->
    <div class="header-wrapper bg-white sticky-top">

        <header id="header" class="header header-default  ">
    
            <!-- navbar container start -->
            <div class="navbar-container">
                <div class="container">
                    <nav class="navbar navbar-expand-lg navbar-light justify-content-between">
                        <footer-link to="/" class="navbar-brand">
                            <img src="../assets/images/logo.png"
                                srcset="../assets/images/logo.png 1x"
                                alt="UniLife">
                        </footer-link>
    
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#primary-nav"
                            aria-controls="primary-nav" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"><i class="tsicon tsicon-menu"></i></span>
                        </button>
                        
                        <!-- <div class="elementor-widget-container">
    
                            <div class="courselog-course-search header-course-search">
                                <form method="get" name="search-course"
                                    class="courselog-search-course-form"
                                    action="https://demo.themewinter.com/wp/courselog/courses/">
    
                                    <input type="text" name="s" class="search-course-input"
                                        placeholder="Search for courses" />
                                    <input type="hidden" name="ref" value="course" />
    
                                    <button class="lp-button button search-course-button"><i
                                            aria-hidden="true"
                                            class="icon icon-search11"></i></button>
                                </form>
                            </div>
    
                        </div> -->
    
                        <div id="primary-nav" class="collapse navbar-collapse">
                            <ul id="main-menu" class="navbar-nav  main-menu">
                                <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-home nav-item">
                                    <router-link to="/">首頁</router-link>
                                </li>
                                <li id="menu-item"
                                    class="menu-item menu-item-type-post_type menu-item-object-page nav-item">
                                    <!-- <a href="activities.html" class="nav-link">所有活動</a> -->
                                    <router-link to="/activities" class="nav-link">所有活動</router-link>
                                </li>
                                <li id="menu-item"
                                    class="menu-item menu-item-type-post_type menu-item-object-page nav-item">
                                    <!-- <a href="https://34.176.147.251/lp-courses-2/" class="nav-link">活動行事曆</a> -->
                                    <router-link to="/calendar" class="nav-link">活動行事曆</router-link>
                                </li>
                                <li id="menu-item"
                                    class="menu-item menu-item-type-post_type menu-item-object-page nav-item">
                                    <!-- <a href="announcements.html" class="nav-link">重要公告</a> -->
                                    <router-link to="/announcements" class="nav-link">重要公告</router-link>
                                </li>
                            </ul>
                        </div> <!-- collapse end -->
                    </nav>
                    <!-- nav end -->
                </div>
                <!-- container end -->
            </div>
            <!-- navbar contianer end -->
        </header>
    
    </div>
</template>