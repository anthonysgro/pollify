'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

// Import React FilePond
import { FilePond } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import { ActualFileObject, FilePondFile, FilePondInitialFile } from 'filepond'
import { Icons } from '@/components/icons'

const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters.',
    }),
    description: z.string().min(0).optional(),
    answers: z.array(z.object({
      text: z.string().min(1, { message: "Answer cannot be empty." })
  })).min(1, { message: "At least one answer is required." })
})

export default function FreePollForm() {
    // State for the file input
    const [files, setFiles] = useState<Array<File>>([])

    const filepondRef = useRef<FilePond>(null)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            answers: [{ text: '' }]
        },
    })

    const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "answers"
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData()

        formData.append('title', values.title)
        formData.append('description', values.description || '')
        formData.append('answers', JSON.stringify(values.answers))
        files.forEach((file) => {
            formData.append('file', file)
        })

        console.log(formData)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="type here..." {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="type here..." {...field} />
                            </FormControl>
                            <FormDescription></FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                        <FilePond
                            ref={filepondRef}
                            files={files}
                            onupdatefiles={(fileItems: FilePondFile[]) => {
                                setFiles(
                                    fileItems.map(
                                        (fileItem) => fileItem.file as File,
                                    ),
                                )
                            }}
                            allowMultiple={false}
                            name="files"
                            labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
                        />
                    </FormControl>
                </FormItem>
                <FormItem>
                    <FormLabel>Answers</FormLabel>
                    {fields.map((field, index) => (
                        <FormField
                            key={field.id}
                            control={form.control}
                            name={`answers.${index}.text`}
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center">
                                <Icons.gripVertical className="hover:cursor-move" />
                                <FormControl>
                                    <Input placeholder="type answer here..." {...field} />
                                </FormControl>
                                <Icons.close className="hover:cursor-pointer" onClick={() => remove(index)} />
                              </FormItem>
              
                                // <FormItem>
                                //     <FormControl>
                                //         <Input placeholder="type answer here..." {...field} />
                                //     </FormControl>
                                //     <FormMessage />
                                //     <Button type="button" onClick={() => remove(index)}>Remove</Button>
                                // </FormItem>
                            )}
                        />
                    ))}
                    <Button type="button" onClick={() => append({ text: '' })}>Add Answer</Button>
                </FormItem>

                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
