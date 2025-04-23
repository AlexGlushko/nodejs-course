## Templating:

1. EJS
   - syntax  example: <p><%= name %> </p>  
   - plain html with inject js code
   - use in express by using ejs-locals middleware
   - have layouts, cli, 

2. Pug
   - syntax example: p #{name} 
   - custom template lang

3. Handlebars  (similar to twig)
   - syntax example: <p>{{name}}</p>
   - easy register helpers (functions, filters, partials)
   - don't support conditions, only true/false
   - don't support loops, only each


4. Nunjacks (most similar to twig)
   - syntax example: {{#each users}}<li>{{name}}</li>{{/each}}
   - filters out of the box {{ foo | replace("foo", "bar") | capitalize }}
   - layouting
   - good documented
  