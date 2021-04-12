import{o as n,c as s,a}from"./app.2550f8b5.js";const t='{"title":"Project List views","description":"","frontmatter":{},"relativePath":"build/projectListView.md","lastUpdated":1618037681660}',p={},o=a('<h1 id="project-list-views"><a class="header-anchor" href="#project-list-views" aria-hidden="true">#</a> Project List views</h1><p>As the Team Projects and My Projects views have the same structure we will only cover the My Projects view here. This view shows quick link buttons to create a new project or switch between the My Projects and Team Projects views.</p><p>Here is the template snippet:</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>wrapper<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>button-wrapper<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ name: <span class="token punctuation">&#39;</span>TeamProjects<span class="token punctuation">&#39;</span> }<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{light: light}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{light: light}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Team Projects<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ name: <span class="token punctuation">&#39;</span>NewProject<span class="token punctuation">&#39;</span> }<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{light: light}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{light: light}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>New Project<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>projects-window<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>error<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>error<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h4</span><span class="token punctuation">&gt;</span></span>Cannot access the the projects database<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h4</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>documents<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>project<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ProjectsList</span> <span class="token attr-name">:light</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>light<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:projects</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>documents<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n\n</code></pre></div><p>As you can see there is not much here, however the nested component <code>ProjectsList</code> can be seen which also has the collection props <code>:projects=&quot;documents&quot;</code> being passed down. The <code>ProjectsList</code> is where the collection of projects is looped through and each project is presented. We will move onto this shortly. We can also see that <code>:light=&quot;light&quot;</code> props is also being passed down. This is a reactive <code>ref</code> property which is either true or false and works in conjunction the the conditional class also in the template above <code>:class=&quot;{light: light}&quot;</code> which gives the element the class of light if the property light is set to true. This is how the provision is put in place to switch from dark mode and back.</p><p>Below is the script snippet which imports the required composables and the ProjectsList component. Then within the setup function the props <code>light</code> is accepted and the ProjectsList is added to components. The composables are destructed and <code>documents</code> is returned so it can be accessed in the template and passed down into the nested component <code>ProjectsList</code></p><div class="language-html"><pre><code>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> getCollection <span class="token keyword">from</span> <span class="token string">&#39;../composables/getCollection&#39;</span>\n<span class="token keyword">import</span> ProjectsList <span class="token keyword">from</span> <span class="token string">&#39;../components/ProjectsList&#39;</span>\n<span class="token keyword">import</span> getUser <span class="token keyword">from</span> <span class="token string">&#39;../composables/getUser&#39;</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    props<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;light&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    components<span class="token operator">:</span> <span class="token punctuation">{</span> ProjectsList <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n        <span class="token keyword">const</span> <span class="token punctuation">{</span> user <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">getUser</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n        <span class="token keyword">const</span> <span class="token punctuation">{</span> documents<span class="token punctuation">,</span> error <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">getCollection</span><span class="token punctuation">(</span><span class="token string">&#39;projects&#39;</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">&#39;userId&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;==&#39;</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span>value<span class="token punctuation">.</span>uid<span class="token punctuation">]</span><span class="token punctuation">)</span>\n\n        <span class="token keyword">return</span> <span class="token punctuation">{</span> documents<span class="token punctuation">,</span> error <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><p>One thing to note here, because this is the component for the user projects the <code>getCollection</code> composable is passed two inputs when destructed. The first argument is the collection to grab, the second argument is a Firebase query using the Firebase <code>where()</code> method in order to only grab documents within the projects collection that have a userId that matches the current logged in user.value.uid. The uid property is part of the Firebase auth user object. When a project is created, it is given a property <code>userId</code> which is set to the value of the users <code>uid</code>.</p><p>Here is the snippet for the <code>getCollection</code> composable showing how when used to grab a single users projects, the if statement comes into play and adds the second argument <code>query</code> and chains it onto the end of the collection reference by using the Firebase <code>where()</code> method and spreading the query in as an argument:</p><div class="language-js"><pre><code>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@vue/reactivity&quot;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> watchEffect <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;@vue/runtime-core&quot;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> fStore <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;../firebase/config&quot;</span>\n\n\n\n<span class="token keyword">const</span> <span class="token function-variable function">getCollection</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">collection<span class="token punctuation">,</span> query</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> documents <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>\n    <span class="token keyword">const</span> error <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">let</span> collectionRef <span class="token operator">=</span> fStore<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span>collection<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">orderBy</span><span class="token punctuation">(</span><span class="token string">&#39;createdAt&#39;</span><span class="token punctuation">,</span><span class="token string">&quot;desc&quot;</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">if</span><span class="token punctuation">(</span>query<span class="token punctuation">)</span><span class="token punctuation">{</span>\n        collectionRef <span class="token operator">=</span> collectionRef<span class="token punctuation">.</span><span class="token function">where</span><span class="token punctuation">(</span><span class="token operator">...</span>query<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">const</span> unsub <span class="token operator">=</span> collectionRef<span class="token punctuation">.</span><span class="token function">onSnapshot</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">snap</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token keyword">let</span> results <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>\n        snap<span class="token punctuation">.</span>docs<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token parameter">doc</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n            doc<span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>createdAt <span class="token operator">&amp;&amp;</span> results<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token operator">...</span>doc<span class="token punctuation">.</span><span class="token function">data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> id<span class="token operator">:</span> doc<span class="token punctuation">.</span>id <span class="token punctuation">}</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n        documents<span class="token punctuation">.</span>value <span class="token operator">=</span> results\n        error<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">null</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span>message<span class="token punctuation">)</span>\n        error<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string">&#39;Could not fetch data&#39;</span>\n        documents<span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token keyword">null</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n    <span class="token comment">// unsub method to prevent multiple onSnapshot events running at the same time</span>\n    <span class="token function">watchEffect</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">onInvalidate</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token function">onInvalidate</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token function">unsub</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n    <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">return</span> <span class="token punctuation">{</span> documents<span class="token punctuation">,</span> error <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> getCollection\n</code></pre></div><p>Moving onto to the <code>ProjectsList</code> component, first lets look at the template.</p><p>At the top there is a search bar with a v-model which we will come back to, then the div with the Vue directive <code>v-for</code>. Inside this div is the structure for each project card, all elements within the v-for div are created for each individual project in the collection and rendered.</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>text<span class="token punctuation">&quot;</span></span> <span class="token attr-name">v-model</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>search<span class="token punctuation">&quot;</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>Title search<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{light: light}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">v-for</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>(project, index) in projectSearch<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:key</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>project.id<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:data-index</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>index<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>container-fluid project-list-wrapper<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>router-link</span> <span class="token attr-name">:to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{ name: <span class="token punctuation">&#39;</span>SingleProject<span class="token punctuation">&#39;</span>, params: {id: project.id} }<span class="token punctuation">&quot;</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>route-tag<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>single row<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{light: light}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>thumbnail col-12 col-sm-3<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>img</span> <span class="token attr-name">:src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>project.imageUrl<span class="token punctuation">&quot;</span></span> <span class="token attr-name">alt</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>project cover image<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>info col-12 col-sm-6<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{light: light}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">&gt;</span></span>{{ project.title }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Project lead: {{ project.userName }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>tasks col-12 col-sm-3<span class="token punctuation">&quot;</span></span> <span class="token attr-name">:class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>{light: light}<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n                <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Tasks: {{ project.tasks.length }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n          <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>router-link</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><p>The components script tags below show the props passed down are accepted and also passed into the <code>setup</code> function to be accessed. The search bar input value is bound to the <code>search</code> ref and used within the <code>computed</code> property to create a filtered project list depending on the user input. Then back in the template instead of v-for looping through the <code>projects</code> we now loop through the computed property <code>projectSearch</code></p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> ref <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/reactivity&#39;</span>\n<span class="token keyword">import</span> <span class="token punctuation">{</span> computed <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;@vue/runtime-core&#39;</span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n    props<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;projects&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;light&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n    <span class="token function">setup</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span><span class="token punctuation">{</span>\n      <span class="token keyword">const</span> search <span class="token operator">=</span> <span class="token function">ref</span><span class="token punctuation">(</span><span class="token string">&#39;&#39;</span><span class="token punctuation">)</span>\n\n      <span class="token keyword">const</span> projectSearch <span class="token operator">=</span> <span class="token function">computed</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> props<span class="token punctuation">.</span>projects<span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">project</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n          <span class="token keyword">return</span> project<span class="token punctuation">.</span>title<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>search<span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token punctuation">}</span><span class="token punctuation">)</span>\n      <span class="token punctuation">}</span><span class="token punctuation">)</span>\n\n      <span class="token keyword">return</span> <span class="token punctuation">{</span> search<span class="token punctuation">,</span> projectSearch <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><p>In practice when the user input is an empty string the whole collection is shown, but with every keystroke the projects are filtered. Notice how both the title and user input are set to lowercase to make the search as user friendly as possible.</p>',16);p.render=function(a,t,p,e,c,u){return n(),s("div",null,[o])};export default p;export{t as __pageData};
