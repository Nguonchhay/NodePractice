/
@swagger
components:
    schemas:
        Category:
            type: object
            required:
                - name
            properties:
                id:
                    type: integer
                    description: The auto-generated id of the book.
                name:
                    type: string
                    description: The title of your book.
            example:
                name: Water
/