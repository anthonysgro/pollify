import * as React from 'react'
import { Dispatch, SetStateAction, useState } from 'react'
import { FormSchema } from '../formSchema'
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from '@/components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@/components/ui/accordion'
import { Icons } from '@/components/icons'
import { Textarea } from '@/components/ui/textarea'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'
import { z } from 'zod'
import { FilePondFile } from 'filepond'

interface OptionalFormFieldProps {
    form: UseFormReturn<FormSchema, any, undefined>
    files: File[]
    setFiles: Dispatch<SetStateAction<File[]>>
}

export function OptionalFormField({
    form,
    files,
    setFiles,
    ...props
}: OptionalFormFieldProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType)

    return (
        <Accordion type="single" collapsible className="w-full mt-0">
            <AccordionItem value="item-1" className="border-0">
                <AccordionTrigger
                    className="hover:no-underline text-muted-foreground pt-2 pb-0 mb-4"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="flex justify-start items-center">
                        {isOpen ? (
                            <>
                                <p className="ml-1 text-xs">Hide description</p>
                            </>
                        ) : (
                            <>
                                <Icons.add className="" size={16} />
                                <p className="ml-1 text-xs">
                                    Add description (optional)
                                </p>
                            </>
                        )}
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0 space-y-4">
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="disabled bg-background"
                                        placeholder="type here..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl className="w-[100%]">
                            <FilePond
                                files={files}
                                acceptedFileTypes={['image/*']}
                                fileValidateTypeDetectType={(source, type) =>
                                    new Promise((resolve, reject) => {
                                        resolve(type)
                                    })
                                }
                                onupdatefiles={(fileItems: FilePondFile[]) => {
                                    setFiles(
                                        fileItems.map(
                                            (fileItem) => fileItem.file as File,
                                        ),
                                    )
                                }}
                                allowMultiple={false}
                                name="files"
                                labelIdle='Drag & Drop your File or <span className="filepond--label-action">Browse</span>'
                            />
                        </FormControl>
                    </FormItem>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
